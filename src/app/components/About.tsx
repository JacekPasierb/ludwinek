import React from "react";
import styles from "../styles/about.module.css";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className={styles.sectionAbout} id="about">
      <div className="container">
        <div className={styles.descriptionWrapper}>
          <div className={styles.leftSide}>
            <p className={styles.description}>
              Łowisko Eko-Torf Lorem to wyjątkowe miejsce, położone na
              terenie dawnej kopalni torfu, otoczone naturą i ciszą.
            </p>
            <ul className={styles.listCheck}>
              <li className={styles.listCheck__item}>
                <Image src="/fish_iconA.png" alt="fish" height={48} width={48} />
                <p className={styles.description}>
                  Do dyspozycji wędkarzy są trzy starannie zarybione zbiorniki.
                </p>
              </li>
              <li className={styles.listCheck__item}>
                <Image src="/fish_iconA.png" alt="fish" height={48} width={48} />
                <p className={styles.description}>
                  Dbamy o środowisko, dlatego obowiązuje zasada "no kill".
                </p>
              </li>
              <li className={styles.listCheck__item}>
                <Image src="/fish_iconA.png" alt="fish" height={48} width={48} />
                <p className={styles.description}>
                  Regularne zarybianie, cisza i bliskość natury to nasze
                  największe atuty.
                </p>
              </li>
            </ul>
            <p className={styles.description}>
              <strong>Dostępne gatunki ryb: </strong> karp, amur, szczupak,
              okoń, sandacz, karaś, płoć, lin, sumik karłowaty.
            </p>
          </div>
          <div className={styles.rightSide}>
            <h2>
              Serdecznie zapraszamy do skorzystania z uroków naszego łowiska.
              Życzymy owocnych połowów i wielu niezapomnianych chwil na łowisku
              Lorem.
            </h2>
            <div className={styles.imageWrapper}>
              <Image
                src="/lowisko.jpg"
                alt="Zbiornik w Ludwinku"
                width={800}
                height={500}
              />
            </div>
            <div className={styles.paymentInfo}>
              <span className={styles.icon}>💳</span>
              <p>
                Możliwość opłaty online przez ikonę skrzynki „
                <strong>OPŁATA</strong>” w górnym rogu strony.
              </p>
              <Link href="#oplata" className={styles.paymentLink}>
                Przejdź do skrzynki
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
