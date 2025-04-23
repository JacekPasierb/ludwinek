"use client"

import Link from "next/link";
import React from "react";
import styles from "../styles/admin.module.css";
import { signOut } from "next-auth/react";

interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>📋 Menu</h2>
        <ul>
          <li className={styles.listItem}>
            <Link href="/admin/posty">Posty</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/zawody">Zawody</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/chatbot">Chatbot</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/">← Wróć na stronę</Link>
          </li>
        </ul>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            marginTop: "1rem",
            background: "black",
            border: "1px solid black",
            color: "white",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          Wyloguj się
        </button>
      </aside>

      <main className={styles.main}>
        <h1>🎣 Panel administratora</h1>
        <p>Witaj w centrum zarządzania łowiskiem.</p>
        {children}
      </main>
    </div>
  );
};

export default AdminDashboard;
