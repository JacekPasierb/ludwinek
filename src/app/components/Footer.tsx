"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  FaEnvelope,
  FaFileAlt,
  FaImages,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import styles from "../styles/footer.module.css";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type OpeningHour = {
  label: string;
  value: string;
};

const LOGO_ALT = "Łowisko EKO-TORF Ludwinek";
const LOGO_LINK_LABEL = "Strona główna Łowiska Ludwinek";

const ADDRESS = "Ludwin 1C";
const MAP_QUERY = "Ludwin+1C";
const MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const CONTACT_CARETAKER = {
  phone: "+48691911777",
  display: "691 911 777",
  ariaLabel: "Zadzwoń do opiekuna łowiska: 691 911 777",
};

const CONTACT_OFFICE = {
  phone: "+48609193579",
  display: "609 193 579",
  ariaLabel: "Zadzwoń do biura: 609 193 579",
};

const CONTACT_EMAIL = {
  address: "kontakt@wędkowanie-ludwin.pl",
  ariaLabel: "Napisz e-mail na adres: kontakt@wędkowanie-ludwin.pl",
};

const OPENING_HOURS: readonly OpeningHour[] = [
  {label: "Poniedziałek – Piątek", value: "8:00 – 16:00"},
  {label: "Sobota", value: "8:00 – 14:00"},
  {label: "Niedziela", value: "Biuro nieczynne"},
] as const;

const NAV_LINKS: readonly NavLink[] = [
  {href: "/#about", label: "O łowisku", icon: <FaInfoCircle />},
  {href: "/relations", label: "Fotorelacje", icon: <FaImages />},
  {href: "/rules", label: "Regulamin", icon: <FaFileAlt />},
] as const;

const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <Link href="/" aria-label={LOGO_LINK_LABEL}>
              <Image
                src="/images/logo-ludwinek.svg"
                alt={LOGO_ALT}
                className={styles.logoImg}
                width={230}
                height={180}
                sizes="(max-width: 420px) 120px, (max-width: 768px) 160px, (max-width: 1200px) 180px, 230px"
                priority
              />
            </Link>
          </div>
        </div>

        <div className={`${styles.column} ${styles.contactColumn}`}>
          <h4>Dane kontaktowe:</h4>
          <address className={styles.address}>
            <p>
              <strong>Adres:</strong>
              <br />
              <span className={styles.contactRow}>
                <FaMapMarkerAlt className={styles.contactIcon} aria-hidden />
                {ADDRESS}{" "}
                <a
                  href={MAP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  ( Pokaż na mapie )
                </a>
              </span>
            </p>

            <p>
              <strong>Opiekun łowiska:</strong>
              <br />
              <a
                href={`tel:${CONTACT_CARETAKER.phone}`}
                aria-label={CONTACT_CARETAKER.ariaLabel}
                className={styles.contactRow}
              >
                <FaPhone className={styles.contactIcon} aria-hidden />
                {CONTACT_CARETAKER.display.replace(/ /g, "\u00A0")}
              </a>
            </p>

            <p>
              <strong>Biuro:</strong>
              <br />
              <a
                href={`tel:${CONTACT_OFFICE.phone}`}
                aria-label={CONTACT_OFFICE.ariaLabel}
                className={styles.contactRow}
              >
                <FaPhone className={styles.contactIcon} aria-hidden />
                {CONTACT_OFFICE.display.replace(/ /g, "\u00A0")}
              </a>
            </p>

            <p>
              <strong>E-mail:</strong>
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL.address}`}
                aria-label={CONTACT_EMAIL.ariaLabel}
                className={`${styles.contactRow} ${styles.contactRowEmail}`}
              >
                <FaEnvelope className={styles.contactIcon} aria-hidden />
                {CONTACT_EMAIL.address}
              </a>
            </p>
          </address>
        </div>

        <div className={styles.column}>
          <h4>Godziny otwarcia biura:</h4>
          {OPENING_HOURS.map(({label, value}) => (
            <p key={label}>
              {label}: {value}
            </p>
          ))}
        </div>

        <nav
          className={`${styles.column} ${styles.linksColumn}`}
          aria-label="Łowisko"
        >
          <h4>Łowisko:</h4>
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({href, label, icon}) => (
              <li key={href}>
                <Link href={href}>
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottomBar}>
        © {currentYear} Łowisko EKO-TORF Ludwinek. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
};

export {Footer};
