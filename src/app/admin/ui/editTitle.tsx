"use client"

import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import React, {useState} from "react";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";

const fetcher = (url: string) => fetch(url).then(res => res.json());


interface RecordFormValues {
  title: string;
}

const EditTitle = () => {
  const [editTitle, setEditTitle] = useState(false);
  const { data, mutate } = useSWR("/api/siteinfo", fetcher);
  const title = data?.heroTitle ?? "";

  const initialValues: RecordFormValues = {
    title: title,
  };

  return (
    <>
      <div>
        <Tittle title={"Tytuł Strony"} />
        {!editTitle && <p onClick={() => setEditTitle(true)}>{title}</p>}
        {editTitle && (
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<RecordFormValues> = {};
              if (!values.title) {
                errors.title = "Wpisz tytuł strony";
              }

              return errors;
            }}
            onSubmit={async(values, {setSubmitting}) => {
              const parsedValues = {
                title: values.title,
              };
              await fetch("/api/siteinfo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: values.title }),
              });
              mutate(); // odśwież dane
              setEditTitle(false);
              console.log("Wysłano dane:", parsedValues);
              setSubmitting(false);
            }}
          >
            {({isSubmitting}) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <Field type="text" name="title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.changeBtn}
                >
                  Aktualizuj Tytuł
                </button>
                <button
                  disabled={isSubmitting}
                  className={styles.changeBtn}
                  onClick={() => setEditTitle(false)}
                >
                  Anuluj
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
      {!editTitle && (
        <button onClick={() => setEditTitle(true)} className={styles.changeBtn}>
          Edytuj
        </button>
      )}
    </>
  );
};

export default EditTitle;
