"use client";

import React, {useState, useMemo} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import useSWR from "swr";
import DatePicker, {registerLocale} from "react-datepicker";
import {pl} from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import Tittle from "../components/Tittle";
import {fetcher} from "@/lib/fetcher";

registerLocale("pl", pl);
import styles from "../styles/editTitle.module.css";

const EMPTY = {species: "", weight: "", catchDate: ""};

/** Normalizuje datę do YYYY-MM-DD (dla input type="date"). Obsługuje DD.MM.YYYY i YYYY-MM-DD. */
function toDateInputValue(str: string): string {
  const s = (str || "").trim();
  if (!s) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (m) {
    const [, d, mo, y] = m;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return s;
}

function toForm(r: any) {
  const raw = (r?.catchDate ?? r?.year ?? "") || "";
  return {
    species: r?.species ?? "",
    weight: r?.weight != null ? String(r.weight) : "",
    catchDate: toDateInputValue(raw),
  };
}

interface RecordForm {
  species: string;
  weight: string;
  catchDate: string;
}

interface Values {
  records: RecordForm[];
}

const EditRecord = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {data, mutate} = useSWR("/api/siteinfo", fetcher);

  const recordFishes = useMemo(() => {
    const list = data?.recordFishes;
    if (!Array.isArray(list))
      return Array(4)
        .fill(null)
        .map(() => ({...EMPTY}));
    const out = list.slice(0, 4).map(toForm);
    while (out.length < 4) out.push({...EMPTY});
    return out;
  }, [data]);

  const initialValues: Values = {
    records: recordFishes.map((r) => ({
      species: r.species ?? "",
      weight: r.weight != null ? String(r.weight) : "",
      catchDate: toDateInputValue(
        (r as any).catchDate ?? (r as any).year ?? ""
      ),
    })),
  };

  return (
    <div className={styles.card}>
      <Tittle title="Rekordy łowiska" />

      {!isEdit ? (
        <>
          <div className={styles.preview} onClick={() => setIsEdit(true)}>
            <div className={styles.previewTitle}>Aktualne rekordy</div>
            <div className={styles.recordsList}>
              {recordFishes.map((rec, idx) => (
                <div key={idx} className={styles.recordRow}>
                  <span className={styles.muted}>Rekord {idx + 1}</span>
                  {(rec as any).species ||
                  (rec as any).weight ||
                  (rec as any).catchDate ||
                  (rec as any).year ? (
                    <span className={styles.previewValue}>
                      {(rec as any).species || "—"}{" "}
                      {(rec as any).weight ? `${(rec as any).weight} kg` : ""}{" "}
                      {(rec as any).catchDate || (rec as any).year
                        ? `(${(rec as any).catchDate || (rec as any).year})`
                        : ""}
                    </span>
                  ) : (
                    <span className={styles.muted}>—</span>
                  )}
                </div>
              ))}
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
            const errors: {
              records?: {
                species?: string;
                weight?: string;
                catchDate?: string;
              }[];
            } = {};
            const weightStr = (r: RecordForm) => String(r.weight ?? "").trim();
            values.records.forEach((r, i) => {
              if (
                r.species?.trim() &&
                (Number(r.weight) <= 0 || !weightStr(r))
              ) {
                if (!errors.records) errors.records = [];
                if (!errors.records[i]) errors.records[i] = {};
                errors.records[i].weight = "Podaj wagę (kg).";
              }
              if ((weightStr(r) || r.catchDate?.trim()) && !r.species?.trim()) {
                if (!errors.records) errors.records = [];
                if (!errors.records[i]) errors.records[i] = {};
                errors.records[i].species = "Podaj gatunek.";
              }
            });
            return errors;
          }}
          onSubmit={async (values, {setSubmitting}) => {
            const list = values.records.slice(0, 4).map((r) => ({
              species: r.species?.trim() ?? "",
              weight: Number(r.weight) || 0,
              catchDate: r.catchDate?.trim() ?? "",
            }));
            while (list.length < 4)
              list.push({species: "", weight: 0, catchDate: ""});
            const recordFishes = list;
            await fetch("/api/siteinfo", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({recordFishes}),
            });
            await mutate();
            setIsEdit(false);
            setSubmitting(false);
          }}
        >
          {({isSubmitting, setFieldValue, values}) => (
            <Form className={styles.form}>
              {[0, 1, 2, 3].map((idx) => {
                const dateStr = values.records[idx]?.catchDate ?? "";
                const dateValue = dateStr
                  ? new Date(dateStr + "T12:00:00")
                  : null;
                return (
                  <div key={idx} className={styles.recordBlock}>
                    <div className={styles.recordBlockTitle}>
                      Rekord {idx + 1}
                    </div>
                    <div className={styles.fieldsRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Gatunek</label>
                        <Field
                          name={`records.${idx}.species`}
                          className={styles.input}
                          placeholder="np. Karp"
                        />
                        <ErrorMessage
                          name={`records.${idx}.species`}
                          component="div"
                          className={styles.error}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Waga (kg)</label>
                        <Field
                          name={`records.${idx}.weight`}
                          type="number"
                          className={styles.input}
                          placeholder="0"
                        />
                        <ErrorMessage
                          name={`records.${idx}.weight`}
                          component="div"
                          className={styles.error}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Data złapania</label>
                        <DatePicker
                          selected={dateValue}
                          onChange={(date: Date | null) => {
                            const str = date
                              ? date.toISOString().slice(0, 10)
                              : "";
                            setFieldValue(`records.${idx}.catchDate`, str);
                          }}
                          dateFormat="dd.MM.yyyy"
                          locale="pl"
                          placeholderText="Kliknij, aby wybrać datę"
                          className={styles.input}
                          isClearable
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        <ErrorMessage
                          name={`records.${idx}.catchDate`}
                          component="div"
                          className={styles.error}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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
