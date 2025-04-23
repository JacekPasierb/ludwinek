"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "../styles/LoginForm.module.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });
    if (result?.ok) {
      window.location.href = result.url || "/admin";
    } else {
      setError("Błędny login lub hasło");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>🔐 Logowanie administratora</h2>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Zaloguj się</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
