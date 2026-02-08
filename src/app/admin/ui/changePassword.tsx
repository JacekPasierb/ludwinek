"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import Tittle from "../components/Tittle";
import styles from "../styles/editTitle.module.css";

const API_CHANGE_PASSWORD = "/api/auth/change-password";
const MIN_PASSWORD_LENGTH = 8;

interface Values {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const TITLE = "Zmiana hasła";
const LABEL_CURRENT = "Obecne hasło";
const LABEL_NEW = "Nowe hasło";
const LABEL_CONFIRM = "Potwierdź nowe hasło";
const PLACEHOLDER_PASSWORD = "••••••••";
const BTN_SUBMIT = "Zmień hasło";
const MSG_SUCCESS = "Hasło zostało zmienione.";
const MSG_ERROR_GENERIC = "Nie udało się zmienić hasła. Spróbuj ponownie.";

const initialValues: Values = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function validate(values: Values): Partial<Record<keyof Values, string>> {
  const errors: Partial<Record<keyof Values, string>> = {};

  if (!values.currentPassword?.trim()) {
    errors.currentPassword = "Podaj obecne hasło.";
  }

  if (!values.newPassword?.trim()) {
    errors.newPassword = "Podaj nowe hasło.";
  } else if (values.newPassword.length < MIN_PASSWORD_LENGTH) {
    errors.newPassword = `Nowe hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków.`;
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Nowe hasła nie są identyczne.";
  }

  return errors;
}

const ChangePassword = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (values: Values) => {
    setApiError(null);

    const res = await fetch(API_CHANGE_PASSWORD, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setApiError(data?.error ?? MSG_ERROR_GENERIC);
      return;
    }

    setSuccessMessage(MSG_SUCCESS);
    setIsEdit(false);
    setApiError(null);

    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className={styles.card}>
      <Tittle title={TITLE} />

      {successMessage && (
        <div
          className={styles.preview}
          style={{
            borderColor: "rgba(34, 197, 94, 0.4)",
            background: "rgba(34, 197, 94, 0.08)",
          }}
        >
          <div className={styles.previewValue} style={{color: "#16a34a"}}>
            {successMessage}
          </div>
        </div>
      )}

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Konto administratora</div>
            <div className={styles.previewValue}>
              <span className={styles.muted}>
                Kliknij, aby zmienić hasło logowania
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className={`${styles.btn} ${styles.btnSecondary} ${styles.editBtn}`}
          >
            Zmień hasło
          </button>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, {setSubmitting}) => {
            await handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form className={styles.form}>
              {apiError && (
                <div className={styles.error} style={{marginBottom: "0.5rem"}}>
                  {apiError}
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="currentPassword">
                  {LABEL_CURRENT}
                </label>
                <div className={styles.passwordWrap}>
                  <Field
                    type={showCurrent ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    className={styles.input}
                    placeholder={PLACEHOLDER_PASSWORD}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowCurrent((s) => !s)}
                    aria-label={showCurrent ? "Ukryj hasło" : "Pokaż hasło"}
                    tabIndex={-1}
                  >
                    {showCurrent ? (
                      <FaEyeSlash aria-hidden />
                    ) : (
                      <FaEye aria-hidden />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="newPassword">
                  {LABEL_NEW}
                </label>
                <div className={styles.passwordWrap}>
                  <Field
                    type={showNew ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className={styles.input}
                    placeholder={PLACEHOLDER_PASSWORD}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowNew((s) => !s)}
                    aria-label={showNew ? "Ukryj hasło" : "Pokaż hasło"}
                    tabIndex={-1}
                  >
                    {showNew ? (
                      <FaEyeSlash aria-hidden />
                    ) : (
                      <FaEye aria-hidden />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="confirmNewPassword">
                  {LABEL_CONFIRM}
                </label>
                <div className={styles.passwordWrap}>
                  <Field
                    type={showConfirm ? "text" : "password"}
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    className={styles.input}
                    placeholder={PLACEHOLDER_PASSWORD}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Ukryj hasło" : "Pokaż hasło"}
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <FaEyeSlash aria-hidden />
                    ) : (
                      <FaEye aria-hidden />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmNewPassword"
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
                  {isSubmitting ? "Zapisywanie…" : BTN_SUBMIT}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsEdit(false);
                    setApiError(null);
                  }}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Anuluj
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ChangePassword;
