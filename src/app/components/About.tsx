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
              Łowisko Ludwinek EKO-TORF to wyjątkowe miejsce na terenie dawnej
              kopalni torfu, otoczone naturą i ciszą. Idealne zarówno na
              spokojne wędkowanie, jak i wypoczynek z rodziną.
            </p>

            <ul className={styles.listCheck}>
              <li className={styles.listCheck__item}>
                <Image
                  src="/fish_iconA.png"
                  alt="fish"
                  height={48}
                  width={48}
                />
                <p className={styles.description}>
                  Do dyspozycji wędkarzy są{" "}
                  <strong>trzy starannie zarybione zbiorniki</strong>.
                </p>
              </li>

              <li className={styles.listCheck__item}>
                <Image
                  src="/fish_iconA.png"
                  alt="fish"
                  height={48}
                  width={48}
                />
                <p className={styles.description}>
                  Dbamy o środowisko — obowiązuje zasada{" "}
                  <strong>NO KILL</strong>.
                </p>
              </li>

              <li className={styles.listCheck__item}>
                <Image
                  src="/fish_iconA.png"
                  alt="fish"
                  height={48}
                  width={48}
                />
                <p className={styles.description}>
                  Na miejscu znajdziesz <strong>strefy do piknikowania</strong>,
                  a przy stanowiskach wyznaczone są miejsca do odpoczynku.
                </p>
              </li>
            </ul>

            <p className={styles.description}>
              <strong>Dostępne gatunki ryb:</strong> karp, amur, szczupak, okoń,
              sandacz, karaś srebrzysty, karaś złocisty, jesiotr, tołpyga, płoć,
              lin, sumik karłowaty, sum hodowlany, wzdręga.
            </p>
          </div>
          <div className={styles.rightSide}>
            <h2 className={styles.heading}>
              Wędkowanie i relaks w jednym miejscu
            </h2>

            <p className={styles.description}>
              Zapraszamy na spokojne połowy, odpoczynek na świeżym powietrzu i
              wspólne chwile w strefach piknikowych. To idealne miejsce na
              weekendowy wypad.
            </p>

            <div className={styles.imageWrapper}>
              <Image
                src="/images/image-about.webp"
                alt="Zbiornik w Ludwinku"
                width={800}
                height={500}
              />
            </div>
            <div className={styles.paymentInfo}>
              <p className={styles.description}>
                Można przyjeżdżać <strong>rodzinami</strong> — dostępne są m.in.{" "}
                <strong>huśtawki</strong>, a w wyznaczonych miejscach można
                zrobić <strong>ognisko</strong> lub <strong>grilla</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
