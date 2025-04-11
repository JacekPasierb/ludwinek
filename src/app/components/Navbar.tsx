import Link from "next/link";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img
            src="/logoW.png"
            alt="Ludwinek logo"
            className={styles.logoImg}
          />
        </div>

        <ul className={styles.links}>
          <li>
            <Link href="/">Ludwinek</Link>
          </li>
          <li>
            <Link href="/relations">Relacje</Link>
          </li>
          <li>
            <Link href="/turnee">Zawody</Link>
          </li>
          <li>
            <Link href="#">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
