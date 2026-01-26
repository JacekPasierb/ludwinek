"use client";

import React, {useEffect} from "react";
import styles from "../styles/editModal.module.css";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function EditModal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <button
        className={styles.backdropClick}
        onClick={onClose}
        aria-label="Zamknij modal"
      />

      <div className={styles.modal} role="document">
        <button className={styles.close} onClick={onClose} aria-label="Zamknij">
          ✕
        </button>

        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {description ? <p className={styles.desc}>{description}</p> : null}
        </div>

        <div className={styles.body}>{children}</div>

        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
}
