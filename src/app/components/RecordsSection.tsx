"use client";

import React from "react";
import styles from "../styles/recordsSection.module.css";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RecordsSection = () => {
  const {data} = useSWR("/api/siteinfo", fetcher);

  const recordFishes = (() => {
    const list = data?.recordFishes;
    if (!Array.isArray(list))
      return Array(4)
        .fill(null)
        .map(() => ({species: "", weight: 0, catchDate: ""}));
    const out = list
      .slice(0, 4)
      .map(
        (r: {
          species?: string;
          weight?: number;
          catchDate?: string;
          year?: string;
        }) => ({
          species: r?.species ?? "",
          weight: Number(r?.weight) || 0,
          catchDate: (r?.catchDate ?? r?.year ?? "") || "",
        })
      );
    while (out.length < 4) out.push({species: "", weight: 0, catchDate: ""});
    return out;
  })();

  const hasRecord = (r: {
    species?: string;
    weight?: number;
    catchDate?: string;
  }) =>
    r?.species?.trim() &&
    Number(r?.weight) > 0 &&
    (r?.catchDate?.trim() ?? "").length > 0;

  const formatDate = (d: string) => {
    const s = (d || "").trim();
    if (!s) return s;
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[3]}.${m[2]}.${m[1]}`;
    return s;
  };

  const Card = ({
    rec,
    idx,
  }: {
    rec: {species: string; weight: number; catchDate: string};
    idx: number;
  }) => (
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
        <div className={styles.marquee}>
          <div className={styles.track}>
            {["a", "b", "c", "d"].map((k) =>
              recordFishes.map((rec, idx) => (
                <Card key={`${k}-${idx}`} rec={rec} idx={idx} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordsSection;
