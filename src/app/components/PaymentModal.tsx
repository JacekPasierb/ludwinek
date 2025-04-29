"use client";

import {useState} from "react";
import styles from "../styles/paymentModal.module.css"; 

export default function PaymentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    firstName: "",

    phone: "",
    rods: "2", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dane do opłaty:", form);
  
    onClose(); 
  };

    if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>

          <h2> Opłata za dzień wędkowania</h2>
          <p>Uzupełnij dane i opłać składkę</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="firstName"
            placeholder="Imię i Nazwisko"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Telefon"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <p>Dniem wędkowania jest dzień zaksięgowania opłaty. Prosimy o dokonywanie płatności w dniu planowanego pobytu.</p>
          <p>30 zł z brzegu</p>
          <p>(Obowiązuje od 6:00 do zmierzchu, mozliwość dokupienie trzeciej wędki za 10zł)</p>
          <div className={styles.radioGroup}>
            <p>Liczba wędek:</p>
            <label className={styles.radio}>
              <input
                type="radio"
                name="rods"
                value="2"
                checked={form.rods === "2"}
                onChange={handleChange}
              />
              2 wędki (30 zł)
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                name="rods"
                value="3"
                checked={form.rods === "3"}
                onChange={handleChange}
              />
              3 wędki (40 zł)
            </label>
          </div>
          <button type="submit">Zapłać</button>
        </form>
      </div>
    </div>
  );
}
