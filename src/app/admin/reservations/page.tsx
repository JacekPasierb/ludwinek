"use client";
import React, {useState} from "react";
import styles from "../../styles/reservations.module.css";

const reservations = [
  {name: "Jan Kowalski", phone: "600123456", date: "2025-05-10"},
  {name: "Anna Nowak", phone: "691234567", date: "2025-05-10"},
  {name: "Marek Zieliński", phone: "784456789", date: "2025-05-10"},
  {name: "Katarzyna Wiśniewska", phone: "601222333", date: "2025-05-10"},
];

export default function Page() {
  const [selectedDate, setSelectedDate] = useState("2025-05-10");
  const [search, setSearch] = useState("");
  const filtered = reservations.filter(
    (r) =>
      r.date === selectedDate &&
      r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>📅 Lista rezerwacji</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
        <div className={styles.filter}>
          <label htmlFor="date">Wybierz datę:</label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filter}>
            <label htmlFor="search">🔍 Szukaj po imieniu/nazwisku:</label>
            <input
              id="search"
              type="text"
              placeholder="np. Jan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Imię i nazwisko</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.empty}>
            Brak rezerwacji spełniających kryteria.
          </p>
        )}
      </div>
    </section>
    // <section className={styles.section}>
    //   <h2 className={styles.heading}>📅 Lista rezerwacji</h2>

    //   <div className={styles.filter}>
    //     <label htmlFor="date">Wybierz datę:</label>
    //     <input
    //       id="date"
    //       type="date"
    //       value={selectedDate}
    //       onChange={(e) => setSelectedDate(e.target.value)}
    //     />
    //   </div>
    //   <div className={styles.filterGroup}>
    //     <div className={styles.filter}>
    //       <label htmlFor="search">🔍 Szukaj po imieniu/nazwisku:</label>
    //       <input
    //         id="search"
    //         type="text"
    //         placeholder="np. Jan..."
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />
    //     </div>
    //   </div>

    //   <div className={styles.list}>
    //     {filtered.length > 0 ? (
    //       filtered.map((r, i) => (
    //         <div key={i} className={styles.card}>
    //           <p className={styles.name}>{r.name}</p>
    //           <p className={styles.phone}>📞 {r.phone}</p>
    //         </div>
    //       ))
    //     ) : (
    //       <p className={styles.empty}>
    //         Brak rezerwacji spełniających kryteria.
    //       </p>
    //     )}
    //   </div>
    // </section>
  );
}
