"use client";

import React, {useCallback, useMemo, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";
import EditModal from "../ui/EditModal";
import Subtitle from "../ui/subtitle";
import styles from "../styles/adminChatBot.module.css";

type ChatbotEntry = {
  _id: string;
  questions: string[];
  answer: string;
};

type ApiResponse = {
  success: boolean;
  data?: ChatbotEntry[];
};

const PAGE_SIZE = 5;
const API_PATH = "/api/chatbot";

const SECTION_CREATE_TITLE = "I Tworzenie Zapytań";
const SECTION_EDIT_TITLE = "II Edycja Zapytań";
const LABEL_QUESTIONS = "Pytania (oddziel przecinkami)";
const LABEL_ANSWER = "Odpowiedź";
const LABEL_SEARCH = "🔍 Szukaj pytania";
const PLACEHOLDER_QUESTIONS = "np. ile kosztuje, cennik, opłata";
const PLACEHOLDER_QUESTIONS_EDIT = "np. cennik, opłata, ile kosztuje";
const PLACEHOLDER_ANSWER = 'np. "Wędkowanie kosztuje 30 zł..."';
const PLACEHOLDER_ANSWER_EDIT = 'np. "Wędkowanie kosztuje..."';
const PLACEHOLDER_SEARCH = "np. cennik, jak zapłacić...";
const HINT_QUESTIONS =
  "Dodaj kilka wariantów pytań, bot lepiej dopasuje odpowiedź.";
const BTN_ADD = "➕ Dodaj interakcję";
const BTN_EDIT = "✏️ Edytuj";
const BTN_DELETE = "🗑️ Usuń";
const BTN_CANCEL = "Anuluj";
const BTN_SAVE = "Zapisz";
const BTN_DELETE_MODAL = "Usuń";
const MODAL_TITLE = "Edytuj interakcję";
const MODAL_DESC =
  "Zmieniaj pytania (oddzielone przecinkami) oraz odpowiedź. Zapis aktualizuje bota od razu.";
const MODAL_DELETE_TITLE = "Usuń wpis";
const MODAL_DELETE_DESC =
  "Czy na pewno chcesz usunąć ten wpis? Ta operacja jest nieodwracalna.";
const BTN_DELETE_CONFIRM = "Usuń wpis";
const EMPTY_STATE = "Brak wyników.";

function parseQuestionsText(text: string): string[] {
  return text
    .split(",")
    .map((q) => q.trim())
    .filter(Boolean);
}

async function apiRequest(
  url: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}

const ChatbotPage = () => {
  const {data, mutate, isLoading} = useSWR<ApiResponse>(API_PATH, fetcher);
  const [questionsText, setQuestionsText] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ChatbotEntry | null>(null);
  const [editQuestionsText, setEditQuestionsText] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const entries: ChatbotEntry[] = useMemo(
    () => (data?.success && data?.data ? data.data : []),
    [data]
  );

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((item) =>
      item.questions.some((qq) => qq.toLowerCase().includes(q))
    );
  }, [entries, search]);

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedData = useMemo(
    () => filteredEntries.slice(startIndex, startIndex + PAGE_SIZE),
    [filteredEntries, startIndex]
  );

  const openEditModal = useCallback((item: ChatbotEntry) => {
    setEditingItem(item);
    setEditQuestionsText(item.questions.join(", "));
    setEditAnswer(item.answer);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingItem(null);
  }, []);

  const handleUpdateEntry = useCallback(async () => {
    if (!editingItem?._id) return;

    const questions = parseQuestionsText(editQuestionsText);
    const trimmedAnswer = editAnswer.trim();

    await apiRequest(`${API_PATH}/${editingItem._id}`, {
      method: "PUT",
      body: JSON.stringify({questions, answer: trimmedAnswer}),
    });

    closeModal();
    mutate();
  }, [editingItem?._id, editQuestionsText, editAnswer, closeModal, mutate]);

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteEntryId(id);
  }, []);

  const handleDeleteFromModal = useCallback(() => {
    if (editingItem?._id) {
      setDeleteEntryId(editingItem._id);
      closeModal();
    }
  }, [editingItem?._id, closeModal]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteEntryId(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteEntryId) return;
    await apiRequest(`${API_PATH}/${deleteEntryId}`, {method: "DELETE"});
    setDeleteEntryId(null);
    mutate();
  }, [deleteEntryId, mutate]);

  const handleCreateEntry = useCallback(async () => {
    const questions = parseQuestionsText(questionsText);
    const trimmedAnswer = answer.trim();

    if (!questions.length || !trimmedAnswer) return;

    await apiRequest(API_PATH, {
      method: "POST",
      body: JSON.stringify({questions, answer: trimmedAnswer}),
    });

    setQuestionsText("");
    setAnswer("");
    mutate();
  }, [questionsText, answer, mutate]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const modalFooter = (
    <>
      <div className={styles.modalActionsLeft}>
        {editingItem?._id && (
          <button
            type="button"
            className={styles.btnDanger}
            onClick={handleDeleteFromModal}
          >
            {BTN_DELETE_MODAL}
          </button>
        )}
      </div>
      <button type="button" className={styles.btnGhost} onClick={closeModal}>
        {BTN_CANCEL}
      </button>
      <button
        type="button"
        className={styles.btnPrimary}
        onClick={handleUpdateEntry}
      >
        {BTN_SAVE}
      </button>
    </>
  );

  const deleteModalFooter = (
    <>
      <button
        type="button"
        className={styles.btnGhost}
        onClick={handleCloseDeleteModal}
      >
        {BTN_CANCEL}
      </button>
      <button
        type="button"
        className={styles.btnDanger}
        onClick={handleConfirmDelete}
        aria-label={BTN_DELETE_CONFIRM}
      >
        {BTN_DELETE_CONFIRM}
      </button>
    </>
  );

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Subtitle title={SECTION_CREATE_TITLE} />
        <div className={styles.filters}>
          <div className={styles.filter}>
            <label htmlFor="questions">{LABEL_QUESTIONS}</label>
            <input
              id="questions"
              type="text"
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              placeholder={PLACEHOLDER_QUESTIONS}
            />
            <p className={styles.hint}>{HINT_QUESTIONS}</p>
          </div>
          <div className={styles.filter}>
            <label htmlFor="answer">{LABEL_ANSWER}</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={PLACEHOLDER_ANSWER}
              rows={3}
              className={styles.textarea}
            />
          </div>
          <div className={styles.filterAction}>
            <button
              type="button"
              onClick={handleCreateEntry}
              className={styles.addBtn}
              disabled={isLoading}
            >
              {BTN_ADD}
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.list}`}>
        <Subtitle title={SECTION_EDIT_TITLE} />
        <div className={styles.searchRow}>
          <div className={styles.filter}>
            <label htmlFor="search">{LABEL_SEARCH}</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={PLACEHOLDER_SEARCH}
            />
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Zapytania</th>
                <th scope="col">Odpowiedź</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, i) => (
                <tr key={item._id}>
                  <td>{startIndex + i + 1}</td>
                  <td>
                    <ul className={styles.questionList} role="list">
                      {item.questions.map((q, idx) => (
                        <li key={`${item._id}-${idx}`}>{q}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.answer}</td>
                  <td className={styles.actions}>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                    >
                      {BTN_EDIT}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(item._id)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                      {BTN_DELETE}
                    </button>
                  </td>
                </tr>
              ))}
              {!paginatedData.length && (
                <tr>
                  <td colSpan={4} style={{padding: "16px"}}>
                    {EMPTY_STATE}
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
              type="button"
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
        title={MODAL_TITLE}
        description={MODAL_DESC}
        onClose={closeModal}
        footer={modalFooter}
      >
        <div className={styles.modalField}>
          <label htmlFor="edit-questions">{LABEL_QUESTIONS}</label>
          <input
            id="edit-questions"
            type="text"
            className={styles.modalInput}
            value={editQuestionsText}
            onChange={(e) => setEditQuestionsText(e.target.value)}
            placeholder={PLACEHOLDER_QUESTIONS_EDIT}
          />
        </div>
        <div className={styles.modalField}>
          <label htmlFor="edit-answer">{LABEL_ANSWER}</label>
          <textarea
            id="edit-answer"
            className={styles.modalTextarea}
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            placeholder={PLACEHOLDER_ANSWER_EDIT}
            rows={5}
          />
        </div>
      </EditModal>

      <EditModal
        open={!!deleteEntryId}
        title={MODAL_DELETE_TITLE}
        description={MODAL_DELETE_DESC}
        onClose={handleCloseDeleteModal}
        footer={deleteModalFooter}
      >
        <div className={styles.deleteModalContent}>
          <span className={styles.deleteModalIcon} aria-hidden>
            🗑️
          </span>
          <p className={styles.deleteModalText}>
            Wpis zostanie trwale usunięty z bazy pytań i nie będzie można go
            przywrócić.
          </p>
        </div>
      </EditModal>
    </section>
  );
};

export default ChatbotPage;
