"use client";

import React, {useState} from "react";
import Image from "next/image";
import useSWR from "swr";
import styles from "../styles/album.module.css";
import {AlbumType} from "./Gallery";
import {FaArrowLeft, FaTimes} from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AlbumProps {
  albumId: AlbumType;
  albumName: string;
  onBack: () => void;
}

const Album: React.FC<AlbumProps> = ({albumId, albumName, onBack}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {data: photos, mutate} = useSWR(
    `/api/photos?album=${albumId}`,
    fetcher
  );

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  if (!photos) {
    return (
      <section className={styles.album}>
        <div className="container">
          <button className={styles.backButton} onClick={onBack}>
            <FaArrowLeft /> Powrót do albumów
          </button>
          <div className={styles.loading}>Ładowanie...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.album}>
        <div className="container">
          <button className={styles.backButton} onClick={onBack}>
            <FaArrowLeft /> Powrót do albumów
          </button>

          <header className={styles.header}>
            <h1 className={styles.title}>{albumName}</h1>
            <p className={styles.count}>
              {photos.length} {photos.length === 1 ? "zdjęcie" : "zdjęć"}
            </p>
          </header>

          {photos.length === 0 ? (
            <div className={styles.empty}>
              <p>Brak zdjęć w tym albumie</p>
            </div>
          ) : (
            <div className={styles.photoGrid}>
              {photos.map((photo: any) => (
                <div
                  key={photo._id}
                  className={styles.photoItem}
                  onClick={() => handleImageClick(photo.url)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt || albumName}
                    width={400}
                    height={300}
                    className={styles.photo}
                    loading="lazy"
                  />
                  {photo.title && (
                    <div className={styles.photoTitle}>{photo.title}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal z pełnym zdjęciem */}
      {selectedImage && (
        <div
          className={styles.modal}
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
        >
          <button
            className={styles.closeButton}
            onClick={handleCloseModal}
            aria-label="Zamknij"
          >
            <FaTimes />
          </button>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Pełny podgląd"
              width={1200}
              height={800}
              className={styles.modalImage}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Album;
