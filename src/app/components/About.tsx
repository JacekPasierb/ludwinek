import React from "react";
import Image from "next/image";
import styles from "../styles/about.module.css";

type ChecklistItem = {
  id: string;
  iconAlt: string;
  content: React.ReactNode;
};

const CHECKLIST_ICON_SIZE = 48;

const FEATURES_CHECKLIST: readonly ChecklistItem[] = [
  {
    id: "zbiorniki",
    iconAlt: "Ikona ryby - trzy zarybione zbiorniki w łowisku Ludwinek",
    content: (
      <>
        Do dyspozycji wędkarzy są{" "}
        <strong>trzy starannie zarybione zbiorniki</strong>.
      </>
    ),
  },
  {
    id: "no-kill",
    iconAlt: "Ikona ryby - zasada NO KILL w łowisku Ludwinek",
    content: (
      <>
        Dbamy o środowisko — obowiązuje zasada <strong>NO KILL</strong>.
      </>
    ),
  },
  {
    id: "piknik",
    iconAlt: "Ikona ryby - strefy piknikowe w łowisku Ludwinek",
    content: (
      <>
        Na miejscu znajdziesz <strong>strefy do piknikowania</strong>, a przy
        stanowiskach wyznaczone są miejsca do odpoczynku.
      </>
    ),
  },
] as const;

const FISH_SPECIES =
  "karp, amur, szczupak, okoń, sandacz, karaś srebrzysty, karaś złocisty, jesiotr, tołpyga, płoć, lin, sumik karłowaty, sum hodowlany, wzdręga";

const About = () => {
  return (
    <section
      className={styles.sectionAbout}
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className={styles.descriptionWrapper}>
          <div className={styles.leftSide}>
            <p className={styles.description}>
              Łowisko Ludwinek EKO-TORF to wyjątkowe miejsce na terenie dawnej
              kopalni torfu, otoczone naturą i ciszą. Idealne zarówno na
              spokojne wędkowanie, jak i wypoczynek z rodziną.
            </p>

            <ul className={styles.listCheck} role="list">
              {FEATURES_CHECKLIST.map(({id, iconAlt, content}) => (
                <li key={id} className={styles.listCheck__item}>
                  <Image
                    src="/fish_iconA.webp"
                    alt={iconAlt}
                    width={CHECKLIST_ICON_SIZE}
                    height={CHECKLIST_ICON_SIZE}
                  />
                  <p className={styles.description}>{content}</p>
                </li>
              ))}
            </ul>

            <p className={styles.description}>
              <strong>Dostępne gatunki ryb:</strong> {FISH_SPECIES}
            </p>
          </div>

          <div className={styles.rightSide}>
            <h2 id="about-heading" className={styles.heading}>
              Wędkowanie i relaks w jednym miejscu
            </h2>

            <p className={styles.description}>
              Zapraszamy na spokojne połowy, odpoczynek na świeżym powietrzu i
              wspólne chwile w strefach piknikowych. To idealne miejsce na
              weekendowy wypad.
            </p>

            <figure className={styles.imageWrapper}>
              <Image
                src="/images/image-about.webp"
                alt="Zbiornik wodny w łowisku EKO-TORF Ludwinek z widokiem na naturę i spokojne miejsce do wędkowania"
                width={800}
                height={500}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 760px"
              />
            </figure>

            <div className={styles.paymentInfo}>
              <p className={styles.description}>
                Można przyjeżdżać <strong>rodzinami</strong> — dostępne są m.in.{" "}
                <strong>huśtawki</strong>, a w wyznaczonych miejscach można
                zrobić <strong>ognisko</strong> lub <strong>grilla</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
