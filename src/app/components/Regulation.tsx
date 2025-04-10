import styles from '../styles/regulations.module.css';

export default function Regulations() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Regulamin łowiska</h2>
        <div className={styles.rules}>
          <div className={styles.ruleBox}>🎣 Obowiązuje zasada NO KILL (zakaz zabierania karpia, amura, tołpygi)</div>
          <div className={styles.ruleBox}>⛔ Zakaz połowu z łodzi i pontonu</div>
          <div className={styles.ruleBox}>📝 Wstęp tylko po wykupieniu zezwolenia w siedzibie Eko-Torf</div>
          <div className={styles.ruleBox}>🎯 Dopuszczalne metody: spławik, grunt, spinning</div>
          <div className={styles.ruleBox}>🌿 Obowiązek zachowania ciszy i porządku</div>
        </div>

        <div className={styles.downloadBox}>
          <p>Pełna wersja regulaminu dostępna w formacie PDF:</p>
          <a href="/regulamin_eko_torf.pdf" className={styles.downloadBtn} download>
            Pobierz regulamin (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
