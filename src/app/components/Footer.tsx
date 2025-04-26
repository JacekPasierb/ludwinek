"use client";

import React from "react";
import styles from "../styles/footer.module.css";
import {FaPhone, FaMapMarkerAlt, FaFacebookF} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
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
            <a href="tel:600123456">
              <FaPhone />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
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
          <a href="/regulamin">Regulamin</a>
          <a href="/mapa-lowiska">Mapa Łowiska</a>
          <a href="/rezerwacje">Rezerwacje</a>
        </div>

        <div className={styles.column}>
          <h4>Menu:</h4>
          <a href="/o-lowisku">O łowisku</a>
          <a href="/galeria">Galeria</a>
          <a href="/kontakt">Kontakt</a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} Łowisko Eko-Torf Ludwinek. Wszelkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
}
