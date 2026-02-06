"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";

import { fetcher } from "@/lib/fetcher";

interface Values {
  subtitle: string;
}

const EditSubtitle = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const subtitle = data?.heroSubtitle ?? "";

  const initialValues: Values = {subtitle};

  return (
    <div className={styles.card}>
      <Tittle title="Podtytuł strony" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualna wartość</div>
            <div className={styles.previewValue}>
              {subtitle || <span className={styles.muted}>Brak</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className={`${styles.btn} ${styles.btnSecondary} ${styles.editBtn}`}
          >
            Edytuj
          </button>
        </>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<Values> = {};
            if (!values.subtitle.trim())
              errors.subtitle = "Wpisz podtytuł strony.";
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({subtitle: values.subtitle}),
            });
            await mutate();
            setIsEdit(false);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="subtitle">
                  Podtytuł
                </label>
                <Field id="subtitle" name="subtitle" className={styles.input} />
                <ErrorMessage
                  name="subtitle"
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
    </div>
  );
};

export default EditSubtitle;
