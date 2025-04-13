"use client";

import Image from "next/image";
import styles from "../styles/competitionSection.module.css";

const competitions = [
  {
    title: "PIĄTY Big Fish PL – Edycja Specjalna",
    date: "29.05 – 01.06.2025",
    location: "ZBIORNIK 1, Ludwinek Eko-Torf",
    description:
      "Zawody karpiowe z wywózką, 3 sektory, 15 drużyn, pula nagród ponad 15 tys. zł. Wśród nagród: Big Fish sektora (3 sektory), Big Fish zawodów, Lucky Loser, Pierwsza ryba powyżej 5 kg.",
    image: "/zaw1.jpg",
    type: "drużynowe",
    method: "dowolna",
    schedule: [
      "29 maja: rejestracja, losowanie stanowisk, start łowienia o 13:00",
      "30–31 maja: ważenie ryb, video relacje, wspólne posiłki",
      "1 czerwca: zakończenie zawodów i wręczenie nagród o 11:00"
    ],
    contact: "786 819 629"
  }
];

export default function CompetitionsSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Zawody wędkarskie</h2>
      <div className={styles.grid}>
        {competitions.map((comp, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.top}>
              <Image
                src={comp.image}
                alt={comp.title}
                width={240}
                height={160}
                className={styles.image}
              />
              <div className={styles.metaContent}>
                <h3 className={styles.title}>{comp.title}</h3>
                <p className={styles.meta}> {comp.date}</p>
                <p className={styles.meta}> {comp.location}</p>
                <p className={styles.meta}> Typ: {comp.type} |  Metoda: {comp.method}</p>
              </div>
            </div>

            <p className={styles.description}>{comp.description}</p>

            <div className={styles.scheduleBox}>
              <p className={styles.scheduleTitle}>Harmonogram:</p>
              <ul>
                {comp.schedule.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.bottomBox}>
              <p className={styles.contact}> Zgłoszenia: <strong>{comp.contact}</strong></p>
              <button className={styles.signupBtn}>Weź udział</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
