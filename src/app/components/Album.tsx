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

type PhotosApiResponse =
  | any[]
  | {
      items: any[];
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };

const getPhotosWord = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (n === 1) return "zdjęcie";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
    return "zdjęcia";
  return "zdjęć";
};

const Album: React.FC<AlbumProps> = ({albumId, albumName, onBack}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const {data, isLoading} = useSWR<PhotosApiResponse>(
    `/api/photos?album=${albumId}&page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  const isPaginated = !!data && !Array.isArray(data);
  const photos = Array.isArray(data) ? data : data?.items ?? [];
  const total = Array.isArray(data) ? photos.length : data?.total ?? 0;
  const pageCount = Array.isArray(data) ? 1 : data?.pageCount ?? 1;

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

  // Gdy zmienia się album, wróć na pierwszą stronę
  React.useEffect(() => {
    setPage(1);
  }, [albumId]);

  if (isLoading || !data) {
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
              {total} {getPhotosWord(total)}
            </p>
          </header>

          {photos.length === 0 ? (
            <div className={styles.empty}>
              <p>Brak zdjęć w tym albumie</p>
            </div>
          ) : (
            <>
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

              {isPaginated && pageCount > 1 && (
                <nav
                  className={styles.pagination}
                  aria-label="Paginacja albumu"
                >
                  <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    Poprzednia
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({length: pageCount}, (_, i) => i + 1)
                      .filter((p) => {
                        // pokaż 1, ostatnią, bieżącą oraz sąsiadów
                        if (p === 1 || p === pageCount) return true;
                        return Math.abs(p - page) <= 1;
                      })
                      .map((p, idx, arr) => {
                        const prev = arr[idx - 1];
                        const showDots = prev && p - prev > 1;
                        return (
                          <React.Fragment key={p}>
                            {showDots && (
                              <span className={styles.dots} aria-hidden="true">
                                …
                              </span>
                            )}
                            <button
                              className={`${styles.pageNumber} ${
                                p === page ? styles.pageActive : ""
                              }`}
                              onClick={() => setPage(p)}
                              aria-current={p === page ? "page" : undefined}
                            >
                              {p}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={page >= pageCount}
                  >
                    Następna
                  </button>
                </nav>
              )}
            </>
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
