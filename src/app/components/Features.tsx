import React from "react";
import Image from "next/image";
import styles from "../styles/features.module.css";

type FeatureItem = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

const FEATURES: readonly FeatureItem[] = [
  {
    id: "zbiorniki",
    src: "/images/icons-zbiorniki.svg",
    alt: "Trzy zbiorniki wodne",
    label: "3 zbiorniki",
  },
  {
    id: "no-kill",
    src: "/no-kill.png",
    alt: "Zasada no-kill",
    label: "Zasada NO KILL",
  },
  {
    id: "smieci",
    src: "/smieci.png",
    alt: "Zakaz wyrzucania śmieci",
    label: "Zakaz pozostawiania śmieci",
  },
] as const;

const ICON_SIZE = 180;

const Features = () => {
  return (
    <section
      className={`${styles.sectionFeatures} container`}
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="sr-only">
        Cechy łowiska
      </h2>

      <ul className={styles.listFeatures} role="list">
        {FEATURES.map(({id, src, alt, label}, index) => (
          <li key={id} className={styles.itemFeature}>
            <Image
              src={src}
              alt={alt}
              width={ICON_SIZE}
              height={ICON_SIZE}
              className={`${styles.iconImage} ${
                id === "zbiorniki" ? styles.iconZbiorniki : ""
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 180px"
            />
            <p>{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
