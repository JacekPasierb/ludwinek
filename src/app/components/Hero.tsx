"use client";

import {usePathname} from "next/navigation";
import styles from "../styles/hero.module.css";
import Navbar from "./Navbar";
import Image from "next/image";
import {useState} from "react";
// import PaymentModal from "./PaymentModal";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Hero = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  if (isAdmin) return null;

  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const title = data?.heroTitle ?? "";
  const subtitle = data?.heroSubtitle ?? "";

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <Navbar />

        <div className="container">
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.contactBox}>
          <div className={styles.label}>
            <span>Biuro</span>
            <span>609 193 571</span>
          </div>
          <div className={styles.label}>
            <span> Jarosław Jakubowski </span>
            <span> 691 911 777</span>
          </div>

          <span className={`${styles.label} ${styles.address}`}>
            Ludwin 1 C
          </span>
        </div>
      </div>
    </section>
  );
};
