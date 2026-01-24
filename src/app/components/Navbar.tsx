"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import {useViewport} from "../hooks/useViewport";
import Image from "next/image";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {isTablet, isMobile} = useViewport();
  const isCompact = isMobile || isTablet;
  // ✅ zapobiega hydration mismatch
  if (!mounted) return null;
  
  return (
    <div className={styles.navBar}>
      <div className={`${styles.navBar__wrapper} container`}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Strona główna Łowiska Ludwinek">
            <Image
              src="/images/logo-ludwinek.svg"
              alt="Łowisko EKO-TORF Ludwinek"
              width={36}
              height={36}
              className={styles.logoImg}
              priority
            />
          </Link>
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
                <Link href="/relations">Fotorelacje</Link>
              </li>
              {/* <li>
                <Link href="/">Zawody</Link>
              </li> */}
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
