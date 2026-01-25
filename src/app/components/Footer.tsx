"use client";

import React from "react";
import styles from "../styles/footer.module.css";
import {FaPhone, FaMapMarkerAlt, FaFacebookF} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <Link href="/" aria-label="Strona główna Łowiska Ludwinek">
              <Image
                src="/images/logo-ludwinek.svg"
                alt="Łowisko EKO-TORF Ludwinek"
                className={styles.logoImg}
                width={230}
                height={180}
                priority
              />
            </Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Dane kontaktowe:</h4>

          <p>
            <strong>Adres:</strong>
            <br />
            Ludwin 1C{" "}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ludwin+1C"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              <FaMapMarkerAlt /> ( Pokaż na mapie )
            </a>
          </p>

          <p>
            <strong>Opiekun łowiska:</strong>
            <br />
            <a
              href="tel:+48691911777"
              aria-label="Zadzwoń do opiekuna łowiska: 691 911 777"
            >
              691&nbsp;911&nbsp;777
            </a>
          </p>

          <p>
            <strong>Biuro:</strong>
            <br />
            <a
              href="tel:+48609193579"
              aria-label="Zadzwoń do biura: 609 193 579"
            >
              609&nbsp;193&nbsp;579
            </a>
          </p>
        </div>

        <div className={styles.column}>
          <h4>Godziny otwarcia biura:</h4>
          <p>Poniedziałek – Piątek: 8:00 – 16:00</p>
          <p>Sobota: 8:00 – 14:00</p>
          <p>Niedziela: Biuro nieczynne</p>
        </div>

        <div className={`${styles.column} ${styles.linksColumn}`}>
          <h4>Łowisko:</h4>
          <Link href="/#about">O łowisku</Link>
          <Link href="/relations">Fotorelacje</Link>
          <Link href="/rules">Regulamin</Link>
          <Link
            href="https://www.facebook.com/lowiskoludwinek"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </Link>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} Łowisko EKO-TORF Ludwinek. Wszelkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
};
