"use client";

import {useState} from "react";
import styles from "../styles/competitionSection.module.css";
import Image from "next/image";

const competitions = [
  {
    title: "PIĄTY Big Fish PL – Edycja Specjalna",
    date: "29.05 – 01.06.2025",
    location: "ZBIORNIK 1, Ludwinek Eko-Torf",
    description:
      "Zawody karpiowe z wywózką, 3 sektory, 15 drużyn, pula nagród ponad 15 tys. zł.",
    image: "/zaw1.jpg",
    type: "drużynowe",
    method:"dowolna"
  },
  {
    title: "Big Fish PL – Nagrody",
    date: "29.05 – 01.06.2025",
    location: "",
    description:
      "2x namioty, łóżka, ponton, akcesoria wędkarskie, 150 kg towaru Bestfeed i więcej!",
    image: "/zaw2.jpg",
    type: "indywidualne",
    method:"spiningowe"
  },
];

export default function CompetitionsSection() {
  const [formData, setFormData] = useState({name: "", email: "", team: ""});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Zgłoszenie:", formData);
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Zawody wędkarskie</h2>
      <div className={styles.column}>
        {competitions.map((comp, idx) => (
          <div key={idx} className={styles.card}>
            <Image
              src={comp.image}
              alt={comp.title}
              width={400}
              height={200}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3>{comp.title}</h3>
              {comp.date && (
                <p className={styles.meta}>
                  {comp.date}
                </p>
              )}
              {comp.location && (
                <p className={styles.meta}>
                  <strong>Miejsce:</strong> {comp.location}
                </p>
              )}
              <div style={{textAlign:"left"}}>
               <p>
                <strong>Typ zawodów:</strong> {comp.type}
              </p>
              <p>
                <strong>METODA:</strong> {comp.method}
              </p></div>
              <p><b>INFORMACJE</b></p>
              <p>{comp.description}</p>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
