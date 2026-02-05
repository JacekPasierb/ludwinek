"use client";

import React from "react";
import styles from "../styles/facebookSection.module.css";
import {FaFacebookF} from "react-icons/fa";

const links = [
  {
    href: "https://www.facebook.com/lowiskoludwinek",
    label: "Facebook – oficjalny profil łowiska",
    ariaLabel: "Oficjalna strona Facebook Łowiska Ludwinek",
  },
  {
    href: "https://www.facebook.com/TU_WSTAW_LINK_DO_DRUGIEGO",
    label: "Facebook – profil opiekuna",
    ariaLabel: "Aktualne relacje i zdjęcia z łowiska na Facebooku",
  },
];

export default function FacebookSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="facebook-heading"
    >
      <div className="container">
        <h2 id="facebook-heading" className={styles.heading}>
          Obserwuj nas na Facebooku
        </h2>
        <p className={styles.subtitle}>
          Bądź na bieżąco z wydarzeniami, zdjęciami i informacjami z łowiska.
        </p>
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={link.ariaLabel}
            >
              <span className={styles.icon}>
                <FaFacebookF />
              </span>
              <span className={styles.label}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
