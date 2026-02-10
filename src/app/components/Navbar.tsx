"use client";

import React, {useEffect, useState} from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import {useViewport} from "../hooks/useViewport";
import Image from "next/image";
import {usePathname} from "next/navigation";
import MenuMobile from "./MenuMobile";

const Navbar = () => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {isTablet, isMobile} = useViewport();
  const isCompact = isMobile || isTablet;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
              width={64}
              height={64}
              className={styles.logoImg}
              sizes="(max-width: 767px) 32px, (max-width: 1199px) 48px, 64px"
              priority
            />
          </Link>
        </div>

        {isCompact ? (
          <>
            <button
              className={`${styles.burger} ${
                isMenuOpen ? styles.burgerOpen : ""
              }`}
              onClick={toggleMenu}
              aria-label="Otwórz menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <MenuMobile isOpen={isMenuOpen} onClose={closeMenu} />
          </>
        ) : (
          <nav aria-label="Główne menu nawigacyjne">
            <ul className={styles.links}>
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? styles.active : ""}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Ludwinek
                </Link>
              </li>
              <li>
                <Link
                  href="/relations"
                  className={
                    pathname.startsWith("/relations") ? styles.active : ""
                  }
                  aria-current={
                    pathname.startsWith("/relations") ? "page" : undefined
                  }
                >
                  Fotorelacje
                </Link>
              </li>
              <li>
                <Link
                  href="/rules"
                  className={pathname.startsWith("/rules") ? styles.active : ""}
                  aria-current={
                    pathname.startsWith("/rules") ? "page" : undefined
                  }
                >
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href={`${pathname}#kontakt`}>Kontakt</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
