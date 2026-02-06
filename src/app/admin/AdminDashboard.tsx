"use client";

import React, {useCallback, useMemo} from "react";
import {signOut} from "next-auth/react";
import {usePathname} from "next/navigation";
import NavLinks from "./ui/nav-links";
import styles from "../styles/admin.module.css";

type AdminDashboardProps = {
  children: React.ReactNode;
};

const DEFAULT_TITLE = "Panel administratora";
const SUBHEADING = "Zarządzaj treściami strony i ustawieniami.";
const BRAND_TITLE = "Ludwinek";
const BRAND_SUB = "Admin panel";
const BTN_LOGOUT = "Wyloguj się";

const PAGE_TITLES: Readonly<Record<string, string>> = {
  "/admin": "Panel administratora",
  "/admin/chatbot": "Zarządzanie chatbotem",
  "/admin/relations": "Zarządzanie relacjami",
};

const AdminDashboard = ({children}: AdminDashboardProps) => {
  const pathname = usePathname();

  const title = useMemo(
    () => PAGE_TITLES[pathname] ?? DEFAULT_TITLE,
    [pathname]
  );

  const handleSignOut = useCallback(() => {
    signOut({callbackUrl: window.location.origin});
  }, []);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Menu panelu">
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden>
            L
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>{BRAND_TITLE}</span>
            <span className={styles.brandSub}>{BRAND_SUB}</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Nawigacja główna">
          <NavLinks />
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            type="button"
            onClick={handleSignOut}
            className={styles.logoutBtn}
            aria-label={BTN_LOGOUT}
          >
            {BTN_LOGOUT}
          </button>
        </div>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <h2 className={styles.heading}>{title}</h2>
            <p className={styles.subheading}>{SUBHEADING}</p>
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
