"use client";

import React from "react";
import styles from "../styles/footer.module.css";
import {FaPhone, FaMapMarkerAlt, FaFacebookF} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <Image
              src="/logoW.png"
              alt="Ludwinek logo"
              className={styles.logoImg}
              width={230}
              height={128}
            />
          </div>
          <div className={styles.icons}>
            <Link href="tel:600123456">
              <FaPhone />
            </Link>
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Dane kontaktowe:</h4>
          <p>📍 Ludwin, Lubelskie</p>
          <p>📞 600 123 456</p>
          <p>✉ kontakt@ekotorf.pl</p>
        </div>

        <div className={styles.column}>
          <h4>Łowisko:</h4>
          <Link href="/#about">O łowisku</Link>
          <Link href="/rules">Regulamin</Link>
          <Link href="#oplata">Rezerwacje</Link>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} Łowisko Eko-Torf Ludwinek. Wszelkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
};
