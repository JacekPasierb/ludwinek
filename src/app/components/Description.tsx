import styles from '../styles/description.module.css'

export default function Description() {
  return (
    <section className={styles.section}>
    <div className={styles.content}>
      <div className={styles.textBox}>
        <h2 className={styles.heading}>O łowisku</h2>
        <p className={styles.text}>
          Łowisko Eko-Torf Ludwinek to wyjątkowe miejsce, położone na terenie dawnej kopalni torfu,
          otoczone naturą i ciszą. Do dyspozycji wędkarzy są trzy stawy, z których każdy ma swój charakter
          i gatunki ryb. Staw nr 1 objęty jest zasadą NO KILL – obowiązuje całkowity zakaz zabierania ryb.
          Regularne zarybianie, wygodne stanowiska i spokojna atmosfera czynią to miejsce idealnym
          zarówno dla amatorów, jak i doświadczonych wędkarzy.
        </p>
      </div>
      <div className={styles.imageBox}>
        <img
          src="/lowisko.jpg"
          alt="Widok łowiska Eko-Torf Ludwinek"
          className={styles.image}
        />
      </div>
    </div>
  </section>
  )
}
