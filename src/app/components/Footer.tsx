import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Łowisko Eko-Torf Ludwinek. Wszelkie prawa zastrzeżone.</p>
        <div className={styles.links}>
          <a href="#">Polityka prywatności</a>
          <a href="mailto:kontakt@ekotorf.pl">kontakt@ekotorf.pl</a>
        </div>
      </div>
    </footer>
  );
}
