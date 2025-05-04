"use client"

import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "../styles/editTitle.module.css";
import Tittle from "../components/Tittle";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then(res => res.json());

interface RecordFormValues2 {
  subtitle: string;
}

const EditSubtitle = () => {
  const [editSubTitle, setEditSubTitle] = useState(false);

  const { data, mutate } = useSWR("/api/siteinfo", fetcher);
  const subtitle = data?.heroSubtitle ?? "";

  const initialValues2: RecordFormValues2 = {
    subtitle: subtitle,
  };

  return (
    <>
      <div>
       <Tittle title={"Podtytuł Strony"}/>
        {!editSubTitle && (
          <p onClick={() => setEditSubTitle(true)}>{subtitle}</p>
        )}
        {editSubTitle && (
          <Formik
            initialValues={initialValues2}
            validate={(values) => {
              const errors: Partial<RecordFormValues2> = {};
              if (!values.subtitle) {
                errors.subtitle = "Wpisz podtytuł strony";
              }

              return errors;
            }}
            onSubmit={async(values, {setSubmitting}) => {
              const parsedValues = {
                subtitle: values.subtitle,
              };
              await fetch("/api/siteinfo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subtitle: values.subtitle }),
              });
              mutate(); // odśwież dane
              setEditSubTitle(false);
              console.log("Wysłano dane:", parsedValues);
              setSubmitting(false);
            }}
          >
            {({isSubmitting}) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <Field type="text" name="subtitle" />
                  <ErrorMessage
                    name="subtitle"
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
                  onClick={() => setEditSubTitle(false)}
                >
                  Anuluj
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
      {!editSubTitle && (
        <button
          onClick={() => setEditSubTitle(true)}
          className={styles.changeBtn}
        >
          Edytuj
        </button>
      )}
    </>
  );
};

export default EditSubtitle;
