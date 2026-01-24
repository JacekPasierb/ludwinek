"use client";

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface InfoFormValues {
  infoMessage: string;
}

const EditInfo = () => {
  const [editInfo, setEditInfo] = useState(false);

  const {data, mutate} = useSWR("/api/siteinfo", fetcher);
  const infoMessage = data?.infoMessage ?? "";

  const initialValues: InfoFormValues = {
    infoMessage,
  };

  return (
    <>
      <div>
        <Tittle title={"Komunikat"} />

        {!editInfo && (
          <p onClick={() => setEditInfo(true)}>
            {infoMessage?.trim()
              ? infoMessage
              : "Brak komunikatu (pasek niewidoczny)."}
          </p>
        )}

        {editInfo && (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<InfoFormValues> = {};

              // pozwalamy na pusty -> ukrywa pasek
              if (values.infoMessage.length > 240) {
                errors.infoMessage = "Maksymalnie 240 znaków.";
              }

              return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
              const parsedValues = {
                infoMessage: values.infoMessage,
              };
              await fetch("/api/siteinfo", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({infoMessage: values.infoMessage}),
              });

              await mutate();
              setEditInfo(false);
              setSubmitting(false);
            }}
          >
            {({isSubmitting, values}) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <Field type="text" name="infoMessage" />

                  <ErrorMessage
                    name="infoMessage"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.changeBtn}
                >
                  Aktualizuj komunikat
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  className={styles.changeBtn}
                  onClick={() => setEditInfo(false)}
                >
                  Anuluj
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {!editInfo && (
        <button onClick={() => setEditInfo(true)} className={styles.changeBtn}>
          Edytuj
        </button>
      )}
    </>
  );
};

export default EditInfo;
