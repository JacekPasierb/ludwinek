import React from "react";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>© 2025 Łowisko Eko-Torf Ludwinek</div>
        <div className={styles.footerLinks}>
          <a href="/polityka-prywatnosci">Polityka prywatności</a>
          <a href="mailto:kontakt@ekotorf.pl">kontakt@ekotorf.pl</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
