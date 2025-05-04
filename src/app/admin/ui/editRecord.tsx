"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import Tittle from "../components/Tittle";
import styles from "../styles/editTitle.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RecordFormValues {
  species: string;
  weight: string;

  year: string;
}

const EditRecord = () => {
  const [edit, setEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const record = data?.recordFish;

  const initialValues: RecordFormValues = {
    species: record?.species || "",
    weight: record?.weight || 0,

    year: record?.year || "",
  };

  return (
    <>
      <div>
        <Tittle title={"Rekord Łowiska"} />

        {!edit && record && (
          <div onClick={() => setEdit(true)} className={styles.recordDisplay}>
            <p>
              <strong>Gatunek:</strong> {record.species}
            </p>
            <p>
              <strong>Waga:</strong> {record.weight} kg
            </p>

            <p>
              <strong>Rok:</strong> {record.year}
            </p>
          </div>
        )}

        {edit && (
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<RecordFormValues> = {};
              if (!values.species) errors.species = "Podaj gatunek ryby";
              if (!values.weight || Number(values.weight) <= 0)
                errors.weight = "Podaj wagę (w kg)";

              if (!values.year) errors.year = "Podaj rok złowienia";
              return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
              await fetch("/api/siteinfo", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({recordFish: values}),
              });
              mutate();
              setEdit(false);
              setSubmitting(false);
            }}
          >
            {({isSubmitting}) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Gatunek ryby</label>
                  <Field type="text" name="species" />
                  <ErrorMessage
                    name="species"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Waga (kg)</label>
                  <Field type="number" name="weight" />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Rok</label>
                  <Field type="text" name="year" />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.changeBtn}
                >
                  Zapisz rekord
                </button>
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className={styles.changeBtn}
                >
                  Anuluj
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
      {!edit && (
        <button onClick={() => setEdit(true)} className={styles.changeBtn}>
          Edytuj
        </button>
      )}
    </>
  );
};

export default EditRecord;
