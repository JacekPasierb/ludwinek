"use client";

import styles from "../styles/competitionSection.module.css";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";

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
      <h2 className={styles.heading}>Najbliższe Zawody</h2>
      <div className={styles.grid}>
        {competitions.map((comp, idx) => (
          <div key={idx} className={styles.card}>
            <Image
              src={comp.image}
              alt={comp.title}
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3>{comp.title}</h3>
              <p className={styles.meta}><strong>📅 {comp.date}</strong></p>
              <p className={styles.meta}><strong>📍 {comp.location}</strong></p>
              <p><strong>🎯 Typ:</strong> {comp.type} | <strong>🎣 Metoda:</strong> {comp.method}</p>
              <p>{comp.description}</p>

              <div className={styles.scheduleBox}>
                <p><strong>📋 Harmonogram:</strong></p>
                <ul>
                  {comp.schedule.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.contactBox}>
                <p><strong>📞 Zgłoszenia:</strong> {comp.contact}</p>
                <button className={styles.signupBtn}>Weź udział</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
