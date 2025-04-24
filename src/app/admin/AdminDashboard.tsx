"use client";

import Link from "next/link";
import React from "react";
import styles from "../styles/admin.module.css";
import {signOut} from "next-auth/react";
import {LuNewspaper, LuPencilLine, LuScrollText} from "react-icons/lu";
import {BsNewspaper} from "react-icons/bs";
import { BiBot, BiTrophy } from "react-icons/bi";

interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button
          onClick={() => signOut({callbackUrl: "/"})}
        
          className={styles.btnLogout}
        >
          Wyloguj się
        </button>
        <ul>
          <li className={styles.listItem}>
            <Link href="/admin/reservations">
              <LuScrollText size={28} /> Rezerwacje
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/relations">
              <LuPencilLine size={28} />
              Relacje
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/turne"><BiTrophy size={28}/>Zawody</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/chatbot"><BiBot size={28}/>Chatbot</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/">← Wróć na stronę</Link>
          </li>
        </ul>
      </aside>

      <main className={styles.main}>
        
        <h1>Panel administratora</h1>
        <p>Witaj w centrum zarządzania łowiskiem.</p>
        {children}
      </main>
    </div>
  );
};

export default AdminDashboard;
