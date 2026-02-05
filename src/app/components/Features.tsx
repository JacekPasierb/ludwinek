import React from "react";
import styles from "../styles/features.module.css";
import Image from "next/image";

const Features = () => {
  return (
    <section
      className={`${styles.sectionFeatures} container`}
      aria-label="Cechy łowiska"
    >
      <ul className={styles.listFeatures}>
        <li className={styles.itemFeature}>
          <Image
            src="/images/icons-zbiorniki.svg"
            alt="Trzy zbiorniki wodne"
            width={180}
            height={180}
            className={`${styles.iconImage} ${styles.iconZbiorniki}`}
          />
          <p>3 zbiorniki</p>
        </li>

        <li className={styles.itemFeature}>
          <Image
            src="/no-kill.png"
            alt="Zasada no-kill"
            className={styles.iconImage}
            width={180}
            height={180}
          />
          <p>Zasada NO KILL</p>
        </li>

        <li className={styles.itemFeature}>
          <Image
            src="/smieci.png"
            alt="Zakaz wyrzucania śmieci"
            className={styles.iconImage}
            width={180}
            height={180}
          />
          <p>Zakaz pozostawiania śmieci</p>
        </li>
      </ul>
    </section>
  );
};

export default Features;
