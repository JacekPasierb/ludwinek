import styles from '../styles/reservation.module.css'

export default function Reservation() {
  return (
    <section className={styles.section}>
      {/* Rezerwacja dzienna - zamiast wrzucania karteczki do skrzynki */}
      <div className={styles.card}>
        <h2>Rezerwacja dzienna (wstęp na łowisko)</h2>
        <p>Wypełnij formularz, aby zgłosić swój wstęp na łowisko. Możesz zapłacić online lub gotówką na miejscu.</p>
        <form className={styles.form}>
          <label>
            Imię i nazwisko:
            <input type="text" name="name" required />
          </label>
          <label>
            Telefon:
            <input type="tel" name="phone" required />
          </label>
          <label>
            Sposób płatności:
            <select name="payment">
              <option value="online">Online</option>
              <option value="cash">Gotówka</option>
            </select>
          </label>
          <button type="submit" className={styles.submitButton}>Zgłoś się na dziś</button>
        </form>
      </div>
    </section>
  );
}
