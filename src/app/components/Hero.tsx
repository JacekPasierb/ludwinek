"use client";

import {usePathname} from "next/navigation";
import styles from "../styles/hero.module.css";
import Navbar from "./Navbar";

import useSWR from "swr";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { fetcher } from "@/lib/fetcher";

export const Hero = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
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
            <span className={styles.labelRow}>
              {" "}
              <FaPhoneAlt className={styles.icon} />
              <a
                href="tel:+48609193571"
                style={{color: "inherit", textDecoration: "none"}}
                aria-label="Zadzwoń do biura: 609 193 571"
              >
                609 193 571
              </a>
            </span>
          </div>
          <div className={styles.label}>
            <span> Jarosław Jakubowski </span>
            <span className={styles.labelRow}>
              {" "}
              <FaPhoneAlt className={styles.icon} />{" "}
              <a
                href="tel:+48691911777"
                style={{color: "inherit", textDecoration: "none"}}
                aria-label="Zadzwoń do Jarosława Jakubowskiego: 691 911 777"
              >
                691 911 777
              </a>
            </span>
          </div>

          <span
            className={`${styles.label} ${styles.labelRow} ${styles.address}`}
          >
            <FaHome className={styles.icon} />
            Ludwin 1 C
          </span>
        </div>
      </div>
    </section>
  );
};
