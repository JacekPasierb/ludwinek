"use client";

import React, {useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import styles from "../styles/menuMobile.module.css";

interface MenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuItem = {href: string; label: string; isHash?: boolean};

const PHONE = "+48691911777";
const PHONE_DISPLAY = "691 911 777";
const ADDRESS = "Ludwin 1C";

const MENU_ITEMS: MenuItem[] = [
  {href: "/", label: "Ludwinek"},
  {href: "/relations", label: "Fotorelacje"},
  {href: "/rules", label: "Regulamin"},
  {href: "#kontakt", label: "Kontakt", isHash: true},
];

export default function MenuMobile({isOpen, onClose}: MenuMobileProps) {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        resolvedHref: item.isHash ? `${pathname}${item.href}` : item.href,
      })),
    [pathname]
  );

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const isItemActive = (item: MenuItem) => {
    if (item.isHash) return false;
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <Link href="/" onClick={onClose} className={styles.brand}>
            <Image
              src="/images/logo-ludwinek.svg"
              alt="Łowisko EKO-TORF Ludwinek"
              width={140}
              height={105}
              className={styles.brandImg}
              priority
            />
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Zamknij menu"
          >
            ✕
          </button>
        </div>

        <nav className={styles.content} aria-label="Menu mobilne">
          <ul className={styles.menuList}>
            {items.map((item) => {
              const active = isItemActive(item);
              return (
                <li key={item.href} className={styles.menuItem}>
                  <Link
                    href={item.resolvedHref}
                    onClick={onClose}
                    className={`${styles.menuLink} ${
                      active ? styles.menuLinkActive : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <a className={styles.phoneButton} href={`tel:${PHONE}`}>
            Zadzwoń: {PHONE_DISPLAY}
          </a>
          <p className={styles.address}>{ADDRESS}</p>
        </div>
      </aside>
    </>
  );
}
