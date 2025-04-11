import Image from "next/image";
import styles from "../styles/description.module.css";

export default function Description() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.features}>
          <div className={styles.feature}>
          <img src="/iconB.png" alt="3 zbiorniki" className={styles.iconImage} />
            <p>3 zbiorniki</p>
          </div>
          <div className={styles.feature}>
          <img src="/iconG.png" alt="3 zbiorniki" className={styles.iconImage} />
            <p>Zasada "no-kill"</p>
          </div>
          <div className={styles.feature}>
          <img src="/iconF.png" alt="3 zbiorniki" className={styles.iconImage} />
            <p>Różnorodne gatunki ryb</p>
          </div>
        </div>
        <div className={styles.infoBox}>
        <div className={styles.textSide}>
          <p className={styles.description}>
            Łowisko Eko-Torf Ludwinek to wyjątkowe miejsce, położone na terenie
            dawnej kopalni torfu, otoczone naturą i ciszą. Do dyspozycji
            wędkarzy są trzy starannie zarybione zbiorniki. Dbamy o środowisko,
            dlatego obowiązuje zasada "no kill". Regularne zarybianie, cisza i
            bliskość natury to nasze największe atuty.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/lowisko.jpg"
            alt="Zbiornik w Ludwinku"
            width={800}
            height={500}
          />
        </div></div>
      </div>
    </section>
  );
}
