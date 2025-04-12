"use client";

import React from "react";
import rules from "../../data/rules.json";
import styles from "../styles/rules.module.css";

const Page = () => {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.heading}>{rules.title}</h1>
        <p className={styles.intro}>{rules.intro}</p>

        <div className={styles.ruleList}>
          {rules.rules.map((rule, i) => (
            <div key={i} className={styles.ruleItem}>
              {rule}
            </div>
          ))}
        </div>

        <h2 className={styles.subheading}>{rules.fishAllowedInfo.title}</h2>
        <ul className={styles.fishList}>
          {rules.fishAllowedInfo.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className={styles.notice}>{rules.fishBanNotice}</p>

        <div className={styles.contactBox}>
          <p>
            <strong>{rules.contact.info}</strong>
          </p>
          <p>{rules.contact.phones.join(" / ")}</p>
          <a href={rules.contact.facebook} className={styles.link}>
            Facebook
          </a>
          <a href={rules.contact.website} className={styles.link}>
            Strona WWW
          </a>
        </div>

        <p className={styles.notice}>{rules.entryNotice}</p>
        <p className={styles.contactBox}>{rules.paymentAddress}</p>
        <p className={styles.intro}>{rules.closingNote}</p>
        <div className={styles.downloadBox}>
        <p>Pełna wersja regulaminu dostępna w formacie PDF:</p>
        <a
          href="/regulamin_eko_torf.pdf"
          className={styles.downloadBtn}
          download
        >
          Pobierz regulamin (PDF)
        </a>
      </div>
      </div>
    
    </section>
  );
};

export default Page;
