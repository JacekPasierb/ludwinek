import React from "react";
import styles from "../styles/features.module.css";

const Features = () => {
  return (
    <section className={`${styles.sectionFeatures} container`}>
      <ul className={styles.listFeatures}>
        <li className={styles.itemFeature}>
          <img
            src="/iconB.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
          />
          <p>3 zbiorniki</p>
        </li>
        <li className={styles.itemFeature}>
          <img
            src="/iconD.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
          />
          <p>Zasada "no-kill"</p>
        </li>
        <li className={styles.itemFeature}>
          <img
            src="/iconI.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
          />
          <p>Różnorodne gatunki ryb</p>
        </li>
      </ul>
    </section>
  );
};

export default Features;
