"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";

import { fetcher } from "@/lib/fetcher";

interface Values {
  title: string;
}

const EditTitle = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const title = data?.heroTitle ?? "";

  const initialValues: Values = {title};

  return (
    <div className={styles.card}>
      <Tittle title="Tytuł strony" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualna wartość</div>
            <div className={styles.previewValue}>
              {title || <span className={styles.muted}>Brak</span>}
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
            if (!values.title.trim()) errors.title = "Wpisz tytuł strony.";
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({title: values.title}),
            });
            await mutate();
            setIsEdit(false);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">
                  Tytuł
                </label>
                <Field id="title" name="title" className={styles.input} />
                <ErrorMessage
                  name="title"
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

export default EditTitle;
