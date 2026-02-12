"use client";

import React, {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {getCloudinaryUrl} from "@/lib/cloudinary";
import styles from "../styles/album.module.css";

export type LightboxPhoto = {
  url: string;
  publicId?: string | null;
  alt?: string;
  title?: string;
};

export default function LightboxGallery({
  photos,
  albumName,
}: {
  photos: LightboxPhoto[];
  albumName: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = useMemo(() => {
    if (activeIndex === null) return null;
    return photos[activeIndex] || null;
  }, [activeIndex, photos]);

  const close = () => setActiveIndex(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // (opcjonalnie) kompensacja "skoku" layoutu gdy znika scrollbar (głównie desktop)
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [activeIndex]);

  return (
    <>
      <div className={styles.photoGrid}>
        {photos.map((photo, idx) => {
          const src = photo.publicId || photo.url;
          const gridUrl = getCloudinaryUrl(src, "medium");
          return (
            <a
              key={`${photo.url}-${idx}`}
              className={styles.photoItem}
              href={getCloudinaryUrl(src, "large")}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(idx);
              }}
              aria-label={`Otwórz zdjęcie: ${photo.title || albumName}`}
            >
              <Image
                src={gridUrl}
                alt={photo.alt || photo.title || albumName}
                width={600}
                height={450}
                className={styles.photo}
                loading="lazy"
              />
              {photo.title && (
                <div className={styles.photoTitle}>{photo.title}</div>
              )}
            </a>
          );
        })}
      </div>

      {active && (
        <div
          className={styles.modal}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
        >
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Zamknij"
            type="button"
          >
            ×
          </button>

          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getCloudinaryUrl(active.publicId || active.url, "large")}
              alt={active.alt || active.title || albumName}
              width={1400}
              height={900}
              className={styles.modalImage}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
