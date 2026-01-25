"use client";

import React, {useState} from "react";
import styles from "../styles/gallery.module.css";
import Album from "./Album";

export type AlbumType = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

const albums = [
  {id: "zbiornik1" as AlbumType, name: "Zbiornik 1", icon: "🐟"},
  {id: "zbiornik2" as AlbumType, name: "Zbiornik 2", icon: "🐠"},
  {id: "zbiornik3" as AlbumType, name: "Zbiornik 3", icon: "🎣"},
  {id: "wydarzenia" as AlbumType, name: "Wydarzenia", icon: "📸"},
];

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
            <button
              key={album.id}
              className={styles.albumCard}
              onClick={() => handleAlbumClick(album.id)}
              aria-label={`Otwórz album ${album.name}`}
            >
              <div className={styles.albumIcon}>{album.icon}</div>
              <h2 className={styles.albumName}>{album.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
