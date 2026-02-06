"use client";

import React, {useCallback, useEffect} from "react";
import styles from "../styles/editModal.module.css";

type EditModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const KEY_ESCAPE = "Escape";
const ARIA_LABEL_CLOSE = "Zamknij modal";

const EditModal = ({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: EditModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KEY_ESCAPE) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      aria-describedby={description ? "edit-modal-desc" : undefined}
    >
      <button
        type="button"
        className={styles.backdropClick}
        onClick={onClose}
        aria-label={ARIA_LABEL_CLOSE}
      />
      <div className={styles.modal} role="document">
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={ARIA_LABEL_CLOSE}
        >
          ✕
        </button>
        <header className={styles.header}>
          <h3 id="edit-modal-title" className={styles.title}>
            {title}
          </h3>
          {description && (
            <p id="edit-modal-desc" className={styles.desc}>
              {description}
            </p>
          )}
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
};

export default EditModal;
