"use client";

import React from "react";
import styles from "../styles/admin.module.css";
import {signOut} from "next-auth/react";
import {usePathname} from "next/navigation";
import NavLinks from "./ui/nav-links";

interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({children}) => {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/admin": "Panel administratora",
    "/admin/chatbot": "Zarządzanie chatbotem",
    "/admin/reservations": "Lista rezerwacji",
    "/admin/relations": "Zarządzanie relacjami",
  };

  const title = pageTitles[pathname] || "Panel administratora";

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>L</div>
          <div className={styles.brandText}>
            <div className={styles.brandTitle}>Ludwinek</div>
            <div className={styles.brandSub}>Admin panel</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavLinks />
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            onClick={() => signOut({callbackUrl: `${window.location.origin}`})}
            className={styles.logoutBtn}
          >
            Wyloguj się
          </button>
        </div>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <h2 className={styles.heading}>{title}</h2>
            <p className={styles.subheading}>
              Zarządzaj treściami strony i ustawieniami.
            </p>
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
