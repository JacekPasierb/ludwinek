import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>Moje łowisko</div>
        <ul className={styles.links}>
          <li>
            <a href="#">Strona główna</a>
          </li>
          <li>
            <a href="#">Regulamin</a>
          </li>
          <li>
            <a href="#">Cennik</a>
          </li>
          <li>
            <a href="#">Kontakt</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;