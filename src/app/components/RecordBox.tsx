"use client"

import useSWR from "swr";
import styles from '../styles/recordBox.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecordBox() {
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const record = data?.recordFish;
  if (!record) return null;
  return (
    <div className={styles.recordBox}>
      🎣 <strong>Rekord łowiska:</strong> {record.species} {record.weight} kg {record.year}
    </div>
  )
}
