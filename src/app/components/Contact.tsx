import styles from '../styles/contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Kontakt i dojazd</h2>

        <div className={styles.infoWrapper}>
          <div className={styles.infoBox}>
            <p><strong>📍 Adres:</strong><br /> Ludwinek 45, 21-010 Łęczna</p>
            <p><strong>📞 Telefon:</strong><br /> <a href="tel:+48500999111">+48 500 999 111</a></p>
            <p><strong>📧 E-mail:</strong><br /> <a href="mailto:kontakt@ekotorf.pl">kontakt@ekotorf.pl</a></p>
            <p><strong>🔗 Facebook:</strong><br /> <a href="https://facebook.com/ekotorf" target="_blank">facebook.com/ekotorf</a></p>
          </div>

          <div className={styles.mapBox}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.793739907407!2d22.840986!3d51.331465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722be1e67a2cfa3%3A0x64eb5f6df54f6e3c!2sLudwinek!5e0!3m2!1spl!2spl!4v1617123123456!5m2!1spl!2spl"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa dojazdu"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
