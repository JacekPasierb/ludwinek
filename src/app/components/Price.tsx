"use client";

import React from "react";
import styles from "../styles/price.module.css";

const Price = () => {
  return (
    <section className={styles.pricingSection}>
      <div className="container">
        <h2 className={styles.heading}>
          Cennik wędkowania <span>(sezon 2025)</span>
        </h2>

        <div className={styles.prices}>
          <div className={styles.priceBox}>
            <h3>30 zł – z brzegu</h3>
            <p>
              Wędkowanie od 6:00 do zmierzchu<br />
              Możliwość dokupienia trzeciej wędki za 10 zł
            </p>
          </div>
          <div className={styles.priceBox}>
            <h3>50 zł – doba karpiowa</h3>
            <p>
              Po wcześniejszym uzgodnieniu<br />
              z właścicielem
            </p>
          </div>
        </div>

        <div className={styles.paymentInfo}>
          <span className={styles.icon}>💳</span>
          <p>
            Możliwość opłaty online przez ikonę skrzynki „<strong>OPŁATA</strong>” w górnym rogu strony.
          </p>
          <a href="#oplata" className={styles.paymentLink}>
            Przejdź do płatności
          </a>
        </div>
      </div>
    </section>
  );
};

export default Price;
