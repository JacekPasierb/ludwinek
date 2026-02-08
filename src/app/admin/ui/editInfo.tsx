"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import EditModal from "./EditModal";
import Tittle from "../components/Tittle";
import {fetcher} from "@/lib/fetcher";
import styles from "../styles/editTitle.module.css";

interface Values {
  infoMessage: string;
}

const MAX = 240;

const BTN_EDIT = "Edytuj";
const BTN_CLEAR = "Wyczyść komunikat";
const BTN_CANCEL = "Anuluj";
const MODAL_CLEAR_TITLE = "Wyczyść komunikat";
const MODAL_CLEAR_DESC =
  "Czy na pewno chcesz usunąć komunikat z paska informacyjnego?";

const EditInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const infoMessage = data?.infoMessage ?? "";
  const hasMessage = Boolean(infoMessage?.trim());

  const initialValues: Values = {infoMessage};

  const handleClearClick = () => setShowClearModal(true);
  const handleCloseClearModal = () => setShowClearModal(false);

  const handleConfirmClear = async () => {
    setIsClearing(true);
    try {
      await fetch("/api/siteinfo", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({infoMessage: ""}),
      });
      await mutate();
      setShowClearModal(false);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className={styles.card}>
      <Tittle title="Komunikat" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualna wartość</div>
            <div className={styles.previewValue}>
              {infoMessage?.trim() ? (
                infoMessage
              ) : (
                <span className={styles.muted}>Brak komunikatu</span>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className={`${styles.btn} ${styles.btnSecondary} ${styles.editBtn}`}
            >
              {BTN_EDIT}
            </button>
            {hasMessage && (
              <button
                type="button"
                onClick={handleClearClick}
                disabled={isClearing}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                {isClearing ? "..." : BTN_CLEAR}
              </button>
            )}
          </div>
        </>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<Values> = {};
            if (values.infoMessage.length > MAX) {
              errors.infoMessage = `Maksymalnie ${MAX} znaków.`;
            }
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                infoMessage: String(values.infoMessage ?? "").trim(),
              }),
            });
            await mutate();
            setIsEdit(false);
            setSubmitting(false);
          }}
        >
          {({isSubmitting, values}) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="infoMessage">
                  Komunikat
                </label>

                <Field
                  as="textarea"
                  id="infoMessage"
                  name="infoMessage"
                  className={styles.textarea}
                  placeholder='Np. "Zbiornik nr 2 nieczynny w dniu 10.02 (zawody)."'
                />

                <div className={styles.counter}>
                  {values.infoMessage.length}/{MAX}
                </div>

                <ErrorMessage
                  name="infoMessage"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Zapisz
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsEdit(false)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Anuluj
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <EditModal
        open={showClearModal}
        title={MODAL_CLEAR_TITLE}
        description={MODAL_CLEAR_DESC}
        onClose={handleCloseClearModal}
        footer={
          <>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleCloseClearModal}
            >
              {BTN_CANCEL}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleConfirmClear}
              disabled={isClearing}
            >
              {isClearing ? "..." : BTN_CLEAR}
            </button>
          </>
        }
      >
        {null}
      </EditModal>
    </div>
  );
};

export default EditInfo;
