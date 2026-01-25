"use client";

import React, {useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import styles from "../styles/menuMobile.module.css";

interface MenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuMobile: React.FC<MenuMobileProps> = ({isOpen, onClose}) => {
  const pathname = usePathname();

  // Zablokuj scroll gdy menu jest otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Zamknij menu po kliknięciu w link
  const handleLinkClick = () => {
    onClose();
  };

  // Zamknij menu po naciśnięciu Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const menuItems = [
    {href: "/", label: "Ludwinek"},
    {href: "/relations", label: "Fotorelacje"},
    {href: "/rules", label: "Regulamin"},
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <nav
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        aria-label="Menu mobilne"
        aria-hidden={!isOpen}
      >
        <ul className={styles.menuList}>
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href} className={styles.menuItem}>
                <Link
                  href={item.href}
                  className={`${styles.menuLink} ${
                    isActive ? styles.menuLinkActive : ""
                  }`}
                  onClick={handleLinkClick}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MenuMobile;
