"use client";
import React from "react";
import styles from "../styles/infobar.module.css";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const InfoBar = () => {
  // if (!data?.enabled) return null;

  // const type = data.type ?? "info";
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const message = data?.infoMessage ?? "";
  return (
    <div className={`${styles.bar} `} role="status" aria-live="polite">
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
    </div>
  );
};

export default InfoBar;
