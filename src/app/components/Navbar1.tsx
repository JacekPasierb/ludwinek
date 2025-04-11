"use client";

import Link from "next/link";
import styles from "../styles/navbar.module.css";
import {useMediaQuery} from "@react-hook/media-query";

const Navbar = () => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.logo}>
            <img
              src="/logoW.png"
              alt="Ludwinek logo"
              className={styles.logoImg}
            />
          </div>
          {!isTablet && (
            <ul className={styles.links}>
              <li>
                <Link href="/" >Ludwinek</Link>
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
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
