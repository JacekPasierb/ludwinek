import React from "react";
import {FaFacebookF} from "react-icons/fa";
import styles from "../styles/facebookSection.module.css";

type FacebookLink = {
  href: string;
  label: string;
  ariaLabel: string;
};

const SECTION_HEADING = "Obserwuj nas na Facebooku";
const SECTION_SUBTITLE =
  "Bądź na bieżąco z wydarzeniami, zdjęciami i informacjami z łowiska.";

const FACEBOOK_LINKS: readonly FacebookLink[] = [
  {
    href: "https://www.facebook.com/lowiskoludwinek",
    label: "Facebook – oficjalny profil łowiska",
    ariaLabel: "Oficjalna strona Facebook Łowiska Ludwinek",
  },
  {
    href: "https://www.facebook.com/JaroLudwinek/",
    label: "Facebook – profil opiekuna",
    ariaLabel: "Aktualne relacje i zdjęcia z łowiska na Facebooku",
  },
] as const;

const FacebookSection = () => (
  <section className={styles.section} aria-labelledby="facebook-heading">
    <div className="container">
      <h2 id="facebook-heading" className={styles.heading}>
        {SECTION_HEADING}
      </h2>
      <p className={styles.subtitle}>{SECTION_SUBTITLE}</p>

      <nav aria-label="Linki do profili Facebook">
        <ul className={styles.links} role="list">
          {FACEBOOK_LINKS.map(({href, label, ariaLabel}) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={ariaLabel}
              >
                <span className={styles.icon} aria-hidden>
                  <FaFacebookF />
                </span>
                <span className={styles.label}>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </section>
);

export default FacebookSection;
