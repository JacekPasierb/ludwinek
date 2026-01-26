"use client";

import React, {useState} from "react";
import styles from "../styles/gallery.module.css";
import Album from "./Album";
import useSWR from "swr";

export type AlbumType = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

const albums = [
  {id: "zbiornik1" as AlbumType, name: "Zbiornik 1"},
  {id: "zbiornik2" as AlbumType, name: "Zbiornik 2"},
  {id: "zbiornik3" as AlbumType, name: "Zbiornik 3"},
  {id: "wydarzenia" as AlbumType, name: "Wydarzenia"},
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AlbumCard = ({
  albumId,
  albumName,
  onOpen,
}: {
  albumId: AlbumType;
  albumName: string;
  onOpen: (albumId: AlbumType) => void;
}) => {
  const {data} = useSWR(`/api/photos?album=${albumId}&limit=1`, fetcher);

  const coverUrl =
    Array.isArray(data) && data.length > 0 && data[0]?.url
      ? data[0].url
      : "/images/logo-ludwinek.png";

  return (
    <button
      className={styles.albumCard}
      style={{backgroundImage: `url(${coverUrl})`}}
      onClick={() => onOpen(albumId)}
      aria-label={`Otwórz album ${albumName}`}
    >
      <div className={styles.albumOverlay} aria-hidden="true" />
      <div className={styles.albumContent}>
        <h2 className={styles.albumName}>{albumName}</h2>
      </div>
    </button>
  );
};

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

  const handleAlbumClick = (albumId: AlbumType) => {
    setSelectedAlbum(albumId);
  };

  const handleBackClick = () => {
    setSelectedAlbum(null);
  };

  if (selectedAlbum) {
    return (
      <Album
        albumId={selectedAlbum}
        albumName={albums.find((a) => a.id === selectedAlbum)?.name || ""}
        onBack={handleBackClick}
      />
    );
  }

  return (
    <section className={styles.gallery}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Fotorelacje</h1>
          <p className={styles.subtitle}>
            Zobacz zdjęcia z naszych zbiorników i wydarzeń
          </p>
        </header>

        <div className={styles.albumsGrid}>
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              albumId={album.id}
              albumName={album.name}
              onOpen={handleAlbumClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
