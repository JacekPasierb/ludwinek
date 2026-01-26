"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import Tittle from "../components/Tittle";
import styles from "../styles/editTitle.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Values {
  species: string;
  weight: string;
  year: string;
}

const EditRecord = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const record = data?.recordFish;

  const initialValues: Values = {
    species: record?.species || "",
    weight: record?.weight ? String(record.weight) : "",
    year: record?.year || "",
  };

  return (
    <div className={styles.card}>
      <Tittle title="Rekord łowiska" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualny rekord</div>

            {record ? (
              <div className={styles.recordGrid}>
                <div className={styles.recordRow}>
                  <span className={styles.muted}>Gatunek</span>
                  <span className={styles.previewValue}>{record.species}</span>
                </div>
                <div className={styles.recordRow}>
                  <span className={styles.muted}>Waga</span>
                  <span className={styles.previewValue}>
                    {record.weight} kg
                  </span>
                </div>
                <div className={styles.recordRow}>
                  <span className={styles.muted}>Rok</span>
                  <span className={styles.previewValue}>{record.year}</span>
                </div>
              </div>
            ) : (
              <div className={styles.previewValue}>
                <span className={styles.muted}>Brak rekordu</span>
              </div>
            )}
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
            if (!values.species.trim()) errors.species = "Podaj gatunek ryby.";
            if (!values.weight || Number(values.weight) <= 0)
              errors.weight = "Podaj wagę (kg).";
            if (!values.year.trim()) errors.year = "Podaj rok.";
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({recordFish: values}),
            });
            await mutate();
            setIsEdit(false);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form className={styles.form}>
              <div className={styles.fieldsRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="species">
                    Gatunek
                  </label>
                  <Field id="species" name="species" className={styles.input} />
                  <ErrorMessage
                    name="species"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="weight">
                    Waga (kg)
                  </label>
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="year">
                    Rok
                  </label>
                  <Field id="year" name="year" className={styles.input} />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className={styles.error}
                  />
                </div>
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

export default EditRecord;
