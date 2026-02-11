"use client";

import {useEffect, useRef, useState} from "react";
import styles from "../styles/chatbot.module.css";

import {FaComments, FaTimes} from "react-icons/fa";
import {getChatbotResponse} from "../../lib/chatBotLogic";
import {usePathname} from "next/navigation";
import Image from "next/image";

interface ChatMessage {
  sender: string;
  text: string;
}

export const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!open) return;
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

    idleTimeoutRef.current = setTimeout(() => {
      setIdleTime((prev) => prev + 1);
    }, 30000);
  }, [chat, open]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [chat]);

  useEffect(() => {
    if (idleTime === 1) {
      setChat((prev) => [
        ...prev,
        {sender: "bot", text: "Nie masz więcej pytań ? 🙂"},
      ]);
    }

    if (idleTime === 2) {
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Nie odzywasz się? Jestem tu cały czas. Jeśli chcesz o coś dopytać, rozpocznij rozmowę jeszcze raz 🙂",
        },
      ]);
    }
  }, [idleTime]);

  useEffect(() => {
    if (open && chat.length === 0) {
      setChat([
        {
          sender: "bot",
          text: "Cześć! Tu Ludwiś – wirtualny pomocnik łowiska Eko-Torf. Chętnie odpowiem na Twoje pytania dotyczące rezerwacji, regulaminu, zawodów i nie tylko 🎣",
        },
      ]);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {sender: "user", text: input};
    const botReply = await getChatbotResponse(input);
    const botMessage = {sender: "bot", text: botReply};

    setChat([...chat, userMessage, botMessage]);
    setInput("");
  };

  if (isAdmin) return null;
  return (
    <>
      <div
        className={styles.chatToggle}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle chatbot"
      >
        {open ? <FaTimes /> : <FaComments />}
      </div>

      <div className={`${styles.chatbot} ${open ? styles.active : ""}`}>
        <div className={styles.chatHeader}>
          <Image
            src="/botAvatar.webp"
            alt="Bot Avatar"
            className={styles.botAvatar}
            width={32}
            height={32}
          />
          <span className={styles.botTitle}>Czat z Ludwinkiem</span>
        </div>
        <div className={styles.chatWindow}>
          {chat.map((msg, i) => (
            <div key={i} className={`${styles.message} ${styles[msg.sender]}`}>
              {msg.text}
            </div>
          ))}
          {idleTime >= 2 && (
            <div className={styles.chatEndInfo}>
              <hr />
              <span>Koniec rozmowy</span>
              <hr />
            </div>
          )}{" "}
          <div ref={chatEndRef} />
        </div>
        {idleTime < 2 && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Wpisz pytanie..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Wyślij
            </button>
          </form>
        )}
        {idleTime >= 2 && (
          <button
            className={styles.restartBtn}
            onClick={() => {
              setIdleTime(0);
              setChat([
                {
                  sender: "bot",
                  text: "Cześć! Tu Ludwiś – wirtualny pomocnik łowiska Eko-Torf. Chętnie odpowiem na Twoje pytania dotyczące rezerwacji, regulaminu, zawodów i nie tylko 🎣",
                },
              ]);
            }}
          >
            Rozpocznij nową rozmowę
          </button>
        )}
      </div>
    </>
  );
};
