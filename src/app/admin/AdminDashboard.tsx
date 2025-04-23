"use client";

import {signOut} from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div style={{padding: "2rem"}}>
      <h1>🎣 Panel administratora</h1>
      <p>Witaj w centrum zarządzania łowiskiem.</p>
      <button
        onClick={() => signOut({callbackUrl: "/admin"})}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#cc0000",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🚪 Wyloguj się
      </button>
      {/* tu dasz odnośniki do postów, zawodów, chatbota itd. */}
    </div>
  );
}
