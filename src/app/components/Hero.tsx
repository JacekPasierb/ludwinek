import styles from '../styles/hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>LOWISKO EKO-TORF LUDWINEK</h1>
        <p className={styles.subtitle}>Profesjonalne łowisko w sercu Lubelszczyzny</p>
        <a href="#" className={styles.button}>Przejdź dalej</a>
      </div>
    </section>
  )
}
