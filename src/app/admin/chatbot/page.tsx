"use client";

import React, {useMemo, useState} from "react";
import useSWR from "swr";
import styles from "../styles/adminChatBot.module.css";
import Subtitle from "../ui/subtitle";
import EditModal from "../ui/EditModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ChatbotEntry = {
  _id: string;
  questions: string[];
  answer: string;
};

export default function Page() {
  const {data, mutate, isLoading} = useSWR("/api/chatbot", fetcher);

  const [questionsText, setQuestionsText] = useState("");
  const [answer, setAnswer] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChatbotEntry | null>(null);

  // ✅ brakowało tego u Ciebie
  const [editQuestionsText, setEditQuestionsText] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const pageSize = 5;

  const filtered: ChatbotEntry[] = useMemo(() => {
    const list: ChatbotEntry[] = data?.data || [];
    const q = search.trim().toLowerCase();
    if (!q) return list;

    return list.filter((item) =>
      item.questions.some((qq) => qq.toLowerCase().includes(q))
    );
  }, [data, search]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const startIndex = (safeCurrentPage - 1) * pageSize;

  const paginatedData = useMemo(
    () => filtered.slice(startIndex, startIndex + pageSize),
    [filtered, startIndex, pageSize]
  );

  const handleEdit = (item: ChatbotEntry) => {
    setEditingItem(item);
    setEditQuestionsText(item.questions.join(", "));
    setEditAnswer(item.answer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleUpdateEntry = async () => {
    if (!editingItem?._id) return;

    const questionsArray = editQuestionsText
      .split(",")
      .map((q) => q.trim())
      .filter(Boolean);

    await fetch(`/api/chatbot/${editingItem._id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        questions: questionsArray,
        answer: editAnswer.trim(),
      }),
    });

    closeModal();
    mutate();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten wpis?")) return;
    await fetch(`/api/chatbot/${id}`, {method: "DELETE"});
    mutate();
  };

  const handleCreateEntry = async () => {
    const questionsArray = questionsText
      .split(",")
      .map((q) => q.trim())
      .filter(Boolean);

    if (!questionsArray.length || !answer.trim()) return;

    await fetch("/api/chatbot", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({questions: questionsArray, answer: answer.trim()}),
    });

    setQuestionsText("");
    setAnswer("");
    mutate();
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Subtitle title="I Tworzenie Zapytań" />

        <div className={styles.filters}>
          <div className={styles.filter}>
            <label htmlFor="questions">Pytania (oddziel przecinkami)</label>
            <input
              id="questions"
              type="text"
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              placeholder="np. ile kosztuje, cennik, opłata"
            />
            <p className={styles.hint}>
              Dodaj kilka wariantów pytań, bot lepiej dopasuje odpowiedź.
            </p>
          </div>

          <div className={styles.filter}>
            <label htmlFor="answer">Odpowiedź</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder='np. "Wędkowanie kosztuje 30 zł..."'
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.filterAction}>
            <button
              onClick={handleCreateEntry}
              className={styles.addBtn}
              disabled={isLoading}
            >
              ➕ Dodaj interakcję
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.list}`}>
        <Subtitle title="II Edycja Zapytań" />

        <div className={styles.searchRow}>
          <div className={styles.filter}>
            <label htmlFor="search">🔍 Szukaj pytania</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="np. cennik, jak zapłacić..."
            />
          </div>
        </div>

        <div className={styles.tableWrap}>
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
              {paginatedData.map((item, i) => (
                <tr key={item._id}>
                  <td>{startIndex + i + 1}</td>
                  <td>
                    <ul className={styles.questionList}>
                      {item.questions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.answer}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleEdit(item)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                    >
                      ✏️ Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                      🗑️ Usuń
                    </button>
                  </td>
                </tr>
              ))}

              {!paginatedData.length && (
                <tr>
                  <td colSpan={4} style={{padding: "16px"}}>
                    Brak wyników.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          {Array.from({length: pageCount}, (_, i) => (
            <button
              key={i}
              className={safeCurrentPage === i + 1 ? styles.activePage : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <EditModal
        open={modalOpen}
        title="Edytuj interakcję"
        description="Zmieniaj pytania (oddzielone przecinkami) oraz odpowiedź. Zapis aktualizuje bota od razu."
        onClose={closeModal}
        footer={
          <>
            <div className={styles.modalActionsLeft}>
              {editingItem?._id ? (
                <button
                  className={styles.btnDanger}
                  onClick={async () => {
                    if (!confirm("Na pewno usunąć ten wpis?")) return;
                    await fetch(`/api/chatbot/${editingItem._id}`, {
                      method: "DELETE",
                    });
                    closeModal();
                    mutate();
                  }}
                >
                  Usuń
                </button>
              ) : null}
            </div>

            <button className={styles.btnGhost} onClick={closeModal}>
              Anuluj
            </button>

            <button className={styles.btnPrimary} onClick={handleUpdateEntry}>
              Zapisz
            </button>
          </>
        }
      >
        <div className={styles.modalField}>
          <label>Pytania (oddziel przecinkami)</label>
          <input
            className={styles.modalInput}
            value={editQuestionsText}
            onChange={(e) => setEditQuestionsText(e.target.value)}
            placeholder="np. cennik, opłata, ile kosztuje"
          />
        </div>

        <div className={styles.modalField}>
          <label>Odpowiedź</label>
          <textarea
            className={styles.modalTextarea}
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            placeholder='np. "Wędkowanie kosztuje..."'
            rows={5}
          />
        </div>
      </EditModal>
    </section>
  );
}
