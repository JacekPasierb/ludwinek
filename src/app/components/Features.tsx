import React from "react";
import styles from "../styles/features.module.css";
import Image from "next/image";

const Features = () => {
  return (
    <section className={`${styles.sectionFeatures} container`}>
      <ul className={styles.listFeatures}>
        <li className={styles.itemFeature}>
          <Image
            src="/iconB.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
            width={144}
            height={144}
          />
          <p>3 zbiorniki</p>
        </li>
        <li className={styles.itemFeature}>
          <Image
            src="/iconD.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
            width={144}
            height={144}
          />
          <p>Zasada "no-kill"</p>
        </li>
        <li className={styles.itemFeature}>
          <Image
            src="/iconI.png"
            alt="3 zbiorniki"
            className={styles.iconImage}
            width={144}
            height={144}
          />
          <p>Różnorodne gatunki ryb</p>
        </li>
      </ul>
    </section>
  );
};

export default Features;
