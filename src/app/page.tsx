import Hero from './components/Hero'
import Navbar from './components/Navbar'
import styles from './styles/home.module.css'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className={styles.wrapper}>
        <section className={styles.section}>
          <h2>Płatność za wstęp na łowisko</h2>
          <p>Wypełnij prosty formularz i zapłać online lub zadeklaruj gotówkę na miejscu.</p>
          <button className={styles.greenBtn}>Zgłoś się na dziś</button>
        </section>

        <section className={styles.section}>
          <h2>Zawody wędkarskie</h2>
          <p>Organizujesz zawody? Zapisz się przez internet – szybko i wygodnie.</p>
          <button className={styles.blueBtn}>Zapisz się na zawody</button>
        </section>
      </main>
    </>
  )
}