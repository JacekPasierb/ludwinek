"use client";

import {useState} from "react";
import {getCsrfToken} from "next-auth/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import styles from "../styles/LoginForm.module.css";
import Image from "next/image";

const RATE_LIMIT_MSG =
  "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const csrfToken = await getCsrfToken();
      const params = new URLSearchParams();
      params.set("csrfToken", csrfToken ?? "");
      params.set("username", username);
      params.set("password", password);
      params.set("callbackUrl", "/admin");
      params.set("json", "true");

      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params.toString(),
        redirect: "manual",
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? RATE_LIMIT_MSG);
        setLoading(false);
        return;
      }

      if (res.status === 302) {
        const url = res.headers.get("Location");
        window.location.href = url || "/admin";
        return;
      }

      const data = await res.json().catch(() => null);
      if (res.ok && data?.url) {
        window.location.href = data.url;
      } else {
        setError("Błędny login lub hasło");
      }
    } catch {
      setError("Błąd połączenia. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imgWrapper}>
        <Image src={"/logo.png"} alt={"Logo"} width={80} height={80} />
      </div>
      <h2 className={styles.title}>🔐 Panel Administracyjny</h2>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <div className={styles.passwordWrap}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          autoComplete="current-password"
        />
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash aria-hidden /> : <FaEye aria-hidden />}
        </button>
      </div>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Logowanie…" : "Zaloguj się"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
