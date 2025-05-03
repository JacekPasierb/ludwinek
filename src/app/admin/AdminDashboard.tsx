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
    "/admin/chatbot": "🤖 Zarządzanie chatbotem",
    "/admin/reservations": "📅 Lista rezerwacji",
    "/admin/relations": "Zarządzanie relacjami",
  };

  const title =
    pageTitles[pathname] || "Witaj w centrum zarządzania łowiskiem.";

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button
          onClick={() => signOut({callbackUrl: `${window.location.origin}`})}
          className={styles.btnLogout}
        >
          Wyloguj się
        </button>
        <NavLinks />
      </aside>

      <main className={styles.main}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.line}></div>
        {children}
      </main>
    </div>
  );
};

export default AdminDashboard;
