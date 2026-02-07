"use client";

import {usePathname} from "next/navigation";
import {FaHome, FaPhoneAlt} from "react-icons/fa";
import Navbar from "./Navbar";
import styles from "../styles/hero.module.css";

const HERO_TITLE = "Łowisko EKO-TORF Ludwinek";
const HERO_SUBTITLE = "Profesjonalne łowisko w sercu Lubelszczyzny.";
const HERO_HOURS = "Czynne 24 godziny na dobę, 7 dni w tygodniu.";

export const Hero = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <Navbar />

        <div className="container">
          <h1 className={styles.title}>{HERO_TITLE}</h1>
          <p className={styles.subtitle}>{HERO_SUBTITLE}</p>
          <p className={styles.subtitleHours}>{HERO_HOURS}</p>
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
