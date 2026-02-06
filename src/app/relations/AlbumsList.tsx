"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/gallery.module.css";

type Album = {
  slug: string;
  name: string;
  description: string;
};

type AlbumsListProps = {
  albums: ReadonlyArray<Album>;
  coverUrls: ReadonlyArray<string>;
};

const AlbumRow = ({
  album,
  coverUrl,
  index,
}: {
  album: Album;
  coverUrl: string;
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFromLeft = index % 2 === 0;

  return (
    <li
      ref={ref}
      className={`${styles.albumRow} ${isFromLeft ? styles.albumRowLeft : styles.albumRowRight} ${isVisible ? styles.albumRowVisible : ""}`}
    >
      <Link
        href={`/relations/${album.slug}`}
        className={`${styles.albumCard} ${isFromLeft ? styles.albumCardFromLeft : styles.albumCardFromRight}`}
        style={{ backgroundImage: `url(${coverUrl})` }}
        aria-label={`Otwórz album ${album.name}`}
      >
        <div className={styles.albumOverlay} aria-hidden />
        <div className={styles.albumContent}>
          <h2 className={styles.albumName}>{album.name}</h2>
        </div>
      </Link>
      <div
        className={`${styles.albumDescription} ${isFromLeft ? styles.albumDescRight : styles.albumDescLeft}`}
      >
        <p>{album.description}</p>
      </div>
    </li>
  );
};

const AlbumsList = ({ albums, coverUrls }: AlbumsListProps) => (
  <ul className={styles.albumsList} role="list">
    {albums.map((album, index) => (
      <AlbumRow
        key={album.slug}
        album={album}
        coverUrl={coverUrls[index]}
        index={index}
      />
    ))}
  </ul>
);

export default AlbumsList;
