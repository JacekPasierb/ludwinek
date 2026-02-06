"use client";

import React, {useMemo} from "react";
import useSWR from "swr";
import styles from "../styles/recordsSection.module.css";
import {fetcher} from "@/lib/fetcher";

type RecordFish = {
  species: string;
  weight: number;
  catchDate: string;
};

type ApiRecord = {
  species?: string;
  weight?: number;
  catchDate?: string;
  year?: string;
};

const RECORDS_COUNT = 4;
const MARQUEE_COPIES = ["a", "b", "c", "d"] as const;

const parseRecord = (r: ApiRecord): RecordFish => ({
  species: r?.species ?? "",
  weight: Number(r?.weight) || 0,
  catchDate: (r?.catchDate ?? r?.year ?? "") || "",
});

const formatDate = (d: string): string => {
  const s = (d || "").trim();
  if (!s) return s;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  return s;
};

const hasRecord = (r: RecordFish): boolean =>
  Boolean(
    r.species?.trim() &&
      Number(r.weight) > 0 &&
      (r.catchDate?.trim() ?? "").length > 0
  );

const RecordsSection = () => {
  const {data, isLoading} = useSWR("/api/siteinfo", fetcher);

  const recordFishes = useMemo((): RecordFish[] => {
    const list = data?.recordFishes;
    if (!Array.isArray(list)) {
      return Array(RECORDS_COUNT)
        .fill(null)
        .map(() => ({
          species: "",
          weight: 0,
          catchDate: "",
        }));
    }
    const out = list.slice(0, RECORDS_COUNT).map(parseRecord);
    while (out.length < RECORDS_COUNT) {
      out.push({species: "", weight: 0, catchDate: ""});
    }
    return out;
  }, [data]);

  if (isLoading) {
    return (
      <section
        className={styles.section}
        aria-label="Rekordy łowiska"
        id="records"
        aria-busy="true"
      >
        <div className={styles.header}>
          <span className={styles.badge}>Rekordy łowiska</span>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <div className={styles.track} aria-hidden>
              {MARQUEE_COPIES.flatMap((k) =>
                Array.from({length: RECORDS_COUNT}, (_, idx) => (
                  <div
                    key={`skeleton-${k}-${idx}`}
                    className={`${styles.recordCard} ${styles.recordCardSkeleton}`}
                    aria-hidden
                  >
                    <div className={styles.skeletonContent}>
                      <div className={styles.skeletonLine} />
                      <div className={styles.skeletonLineShort} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.section}
      aria-label="Rekordy łowiska"
      id="records"
    >
      <div className={styles.header}>
        <span className={styles.badge}>Rekordy łowiska</span>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {MARQUEE_COPIES.flatMap((k) =>
              recordFishes.map((rec, idx) => (
                <RecordCard key={`${k}-${idx}`} rec={rec} idx={idx} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const RecordCard = ({rec, idx}: {rec: RecordFish; idx: number}) => (
  <div className={styles.recordCard} aria-label={`Rekord ${idx + 1}`}>
    {hasRecord(rec) ? (
      <div className={styles.recordValue}>
        <div className={styles.recordValueTop}>
          <span className={styles.recordSpecies}>{rec.species}</span>
          <span className={styles.recordWeight}>
            {Number(rec.weight).toFixed(1)} kg
          </span>
        </div>
        <span className={styles.recordDate}>{formatDate(rec.catchDate)}</span>
      </div>
    ) : (
      <div className={styles.recordEmpty}>—</div>
    )}
  </div>
);

export default RecordsSection;
