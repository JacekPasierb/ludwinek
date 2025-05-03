"use client";

import React, {useState} from "react";
import useSWR from "swr";
import styles from "../styles/adminChatBot.module.css";
import Subtitle from "../ui/subtitle";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const {data, mutate} = useSWR("/api/chatbot", fetcher);
  const [questionsText, setQuestionsText] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestionsText, setEditQuestionsText] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const pageSize = 5;

  const filtered =
    data?.data?.filter((item: any) =>
      item.questions.some((q: string) =>
        q.toLowerCase().includes(search.toLowerCase())
      )
    ) || [];
  const total = filtered.length;

  const pageCount = Math.ceil(total / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setEditQuestionsText(item.questions.join(", "));
    setEditAnswer(item.answer);
  };

  const handleUpdateEntry = async () => {
    const questionsArray = editQuestionsText
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    await fetch(`/api/chatbot/${editingId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({questions: questionsArray, answer: editAnswer}),
    });

    setEditingId(null);
    mutate(); // odśwież dane
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten wpis?")) return;
    await fetch(`/api/chatbot/${id}`, {method: "DELETE"});
    mutate();
  };

  const handleCreateEntry = async () => {
    if (!questionsText || !answer) return;

    const questionsArray = questionsText
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    await fetch("/api/chatbot", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({questions: questionsArray, answer}),
    });

    setQuestionsText("");
    setAnswer("");
    mutate();
  };

  return (
    <section className={styles.section}>
      <Subtitle title={"I Tworzenie Zapytan"} />

      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="questions">Pytania (oddziel przecinkami):</label>
          <input
            id="questions"
            type="text"
            value={questionsText}
            onChange={(e) => setQuestionsText(e.target.value)}
            placeholder="np. ile kosztuje, cennik, opłata"
          />
        </div>
        <div className={styles.filter}>
          <label htmlFor="answer">Odpowiedź:</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="np. Wędkowanie kosztuje 30 zł..."
          />
        </div>
        <div className={styles.filter}>
          <label style={{display: "none"}}>Dodaj</label>
          <button onClick={handleCreateEntry} className={styles.addBtn}>
            ➕ Dodaj interakcje
          </button>
        </div>
      </div>

      <div className={styles.list}>
        <Subtitle title={"II Edycja Zapytań"} />
        <div className={styles.filter}>
          <label htmlFor="search">🔍 Szukaj pytania:</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset do 1. strony przy wyszukiwaniu
            }}
            placeholder="np. cennik, jak zapłacić..."
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Zapytania</th>
              <th>Odpowiedź</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: any, i: number) =>
              editingId === item._id ? (
                <tr key={item._id} style={{backgroundColor: "lightyellow"}}>
                  <td>{startIndex + i + 1}</td>

                  <td>
                    <input
                      className={styles.editInput}
                      value={editQuestionsText}
                      onChange={(e) => setEditQuestionsText(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.editInput}
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                    />
                  </td>
                  <td className={styles.actions}>
                    <button
                      onClick={handleUpdateEntry}
                      className={`${styles.editBtn} ${styles.actionBtn}`}
                    >
                      💾 Zapisz
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className={`${styles.editBtn} ${styles.actionBtn}`}
                    >
                      ❌ Anuluj
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item._id}>
                  <td>{startIndex + i + 1}</td>
                  <td>
                    <ul className={styles.questionList}>
                      {item.questions.map((q: string, idx: number) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.answer}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleEdit(item)}
                      className={`${styles.editBtn} ${styles.actionBtn}`}
                    >
                      ✏️ <p>Edytuj</p>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className={`${styles.deleteBtn} ${styles.actionBtn}`}
                    >
                      🗑️ <p>Usuń</p>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {Array.from({length: pageCount}, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? styles.activePage : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
