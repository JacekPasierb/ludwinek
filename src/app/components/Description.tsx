import Image from "next/image";
import styles from "../styles/description.module.css";

export default function Description() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
       
        <div className={styles.infoBox}>
          <div className={styles.textSide}>
            <p className={styles.description}>
              Łowisko Eko-Torf Ludwinek to wyjątkowe miejsce, położone na
              terenie dawnej kopalni torfu, otoczone naturą i ciszą. Do
              dyspozycji wędkarzy są trzy starannie zarybione zbiorniki. Dbamy o
              środowisko, dlatego obowiązuje zasada "no kill". Regularne
              zarybianie, cisza i bliskość natury to nasze największe atuty.
            </p>
            <p className={styles.description}>
              Dostępne gatunki ryb: karp, amur, szczupak, okoń, sandacz, karaś,
              płoć, lin, sumik karłowaty. Serdecznie zapraszamy do skorzystania
              z uroków naszego łowiska. życzymy owocnych połowów i wielu
              niezapomnianych chwil na łowisku Ludwinek.
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/lowisko.jpg"
              alt="Zbiornik w Ludwinku"
              width={800}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
