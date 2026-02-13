"use client";

import React from "react";
import useSWR from "swr";
import styles from "../styles/infobar.module.css";
import {fetcher} from "@/lib/fetcher";

const InfoBar = () => {
  const {data} = useSWR("/api/siteinfo", fetcher);
  const message =
    data?.infoMessage?.trim() || "Serdecznie zapraszamy na Łowisko Ludwinek Eko-Torf. Do zobaczenia nad wodą.";

  return (
    <section className={styles.bar} role="status" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>WAŻNE INFORMACJE</span>
        </div>

        <div className={styles.marquee} aria-label={message}>
          <div className={styles.track}>
            <span className={styles.text}>{message}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBar;
