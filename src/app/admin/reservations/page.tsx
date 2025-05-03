"use client";

import useSWR from "swr";
import React, {useState} from "react";
import styles from "../../styles/adminReservations.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const {data, error, isLoading} = useSWR("/api/payment", fetcher, {
    refreshInterval: 10000, // 🔁 co 10 sekund
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !data?.payments) return <p>Ładowanie danych...</p>;
  if (error) return <p>Błąd ładowania danych.</p>;

  const filtered = data.payments.filter((r: any) => {
    const date = new Date(r.createdAt).toISOString().split("T")[0];
    return (
      date === selectedDate &&
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const pageSize = 6;
  const pageCount = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filtered.slice(startIndex, endIndex);

  const liczbaWedkarzy = filtered.length;

  return (
    <section className={styles.section}>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
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
          <>
            <div className={styles.tableInfoRow}>
              <span>
                Wyświetlono{" "}
                <strong>
                  {startIndex + 1}–{Math.min(endIndex, liczbaWedkarzy)}
                </strong>{" "}
                z <strong>{liczbaWedkarzy}</strong>
              </span>
              <span>
                Wędkarzy na łowisku: <strong>{liczbaWedkarzy}</strong>
              </span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Imię i nazwisko</th>
                  <th>Telefon</th>
                  <th>Opłata</th>
                  <th>Godzina Rezerwacji</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((r: any, i: number) => (
                  <tr key={i}>
                    <td>{startIndex + i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.amount} zł</td>
                    <td>
                      {new Date(r.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pageCount > 1 && (
              <div className={styles.pagination}>
                {Array.from({length: pageCount}, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? styles.activePage : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className={styles.empty}>
            Brak rezerwacji spełniających kryteria.
          </p>
        )}
      </div>
    </section>
  );
}
