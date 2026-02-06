"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";

import { fetcher } from "@/lib/fetcher";

interface Values {
  infoMessage: string;
}

const MAX = 240;

const EditInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const infoMessage = data?.infoMessage ?? "";

  const initialValues: Values = {infoMessage};

  return (
    <div className={styles.card}>
      <Tittle title="Komunikat (pasek)" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualna wartość</div>
            <div className={styles.previewValue}>
              {infoMessage?.trim() ? (
                infoMessage
              ) : (
                <span className={styles.muted}>
                  Brak komunikatu (pasek niewidoczny)
                </span>
              )}
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
            if (values.infoMessage.length > MAX) {
              errors.infoMessage = `Maksymalnie ${MAX} znaków.`;
            }
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({infoMessage: values.infoMessage}),
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
    </div>
  );
};

export default EditInfo;
