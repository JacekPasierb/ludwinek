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
        <div className={styles.contactBar}>
          <div className={styles.contactInner}>
            <a
              className={styles.contactLink}
              href="tel:+48609193571"
              aria-label="Zadzwoń do biura"
            >
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.6 10.8c1.6 3 3.6 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.contactText}>
                <span className={styles.label}>Biuro</span>
                <span className={styles.value}>609&nbsp;193&nbsp;571</span>
              </span>
            </a>

            <span className={styles.divider} aria-hidden="true" />

            <a
              className={styles.contactLink}
              href="tel:+48691911777"
              aria-label="Zadzwoń do opiekuna łowiska"
            >
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 14c3-3 6-4 9-4s6 1 7 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 10V4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 4l-2 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 4l2 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 14c.6 2.4 2.2 4 4 4s3.4-1.6 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className={styles.contactText}>
                <span className={styles.label}>Opiekun łowiska</span>
                <span className={styles.value}>Jarosław Jakubowski</span>
                <span className={styles.subValue}>691&nbsp;911&nbsp;777</span>
              </span>
            </a>

            <span className={styles.divider} aria-hidden="true" />

            <a
              className={`${styles.contactLink} ${styles.contactAddress}`}
              href="https://www.google.com/maps/search/?api=1&query=21-075%20Ludwin%201C"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otwórz adres w Mapach Google"
            >
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>

              <span className={styles.contactText}>
                <span className={styles.label}>Adres</span>
                <span className={styles.value}>21-075 Ludwin, Ludwin 1C</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
