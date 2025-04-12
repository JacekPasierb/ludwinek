"use client";

import React from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import {useViewport} from "../hooks/useViewport";

const Navbar = () => {
  const {isTablet, isMobile} = useViewport();
  const isCompact = isMobile || isTablet;

  return (
    <div className={styles.navBar}>
      <div className={`${styles.navBar__wrapper} container`}>
        <div className={styles.logo}>
          <img
            src="/logoW.png"
            alt="Ludwinek logo"
            className={styles.logoImg}
          />
        </div>
        {isCompact ? (
          <button className={styles.burger}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        ) : (
          <nav>
            <ul className={styles.links}>
              <li>
                <Link href="/">Ludwinek</Link>
              </li>
              <li>
                <Link href="/relacje">Relacje</Link>
              </li>
              <li>
                <Link href="/turnee">Zawody</Link>
              </li>
              <li>
                <Link href="/rules">Regulamin</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
