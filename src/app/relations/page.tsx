import Link from "next/link";
import styles from "../styles/gallery.module.css";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";

type AlbumRoute = {
  slug: "zbiornik-1" | "zbiornik-2" | "zbiornik-3" | "wydarzenia";
  name: string;
  albumCode: "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";
  coverStrategy: "manual-or-newest" | "newest";
};

const albums: AlbumRoute[] = [
  {
    slug: "zbiornik-1",
    name: "Zbiornik 1",
    albumCode: "zbiornik1",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "zbiornik-2",
    name: "Zbiornik 2",
    albumCode: "zbiornik2",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "zbiornik-3",
    name: "Zbiornik 3",
    albumCode: "zbiornik3",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "wydarzenia",
    name: "Wydarzenia",
    albumCode: "wydarzenia",
    coverStrategy: "newest",
  },
];

async function getAlbumCoverUrl(album: AlbumRoute): Promise<string> {
  await connectToDatabase();

  // Placeholder, gdy nie ma zdjęć
  const placeholder = "/images/logo-ludwinek.png";
  type PhotoLean = {url?: string} | null;

  if (album.coverStrategy === "manual-or-newest") {
    const cover = (await Photo.findOne({
      album: album.albumCode,
      isCover: true,
    })
      .sort({createdAt: -1, _id: -1})
      .lean()) as any as PhotoLean;
    if (cover?.url) return cover.url;
  }

  const newest = (await Photo.findOne({album: album.albumCode})
    .sort({createdAt: -1, _id: -1})
    .lean()) as any as PhotoLean;
  return newest?.url || placeholder;
}

export default async function RelacjePage() {
  const covers = await Promise.all(albums.map((a) => getAlbumCoverUrl(a)));

  return (
    <section className={styles.gallery} aria-labelledby="relations-title">
      <div className="container">
        <header className={styles.header}>
          <h1 id="relations-title" className={styles.title}>
            Fotorelacje
          </h1>
          <p className={styles.subtitle}>
            Wybierz album. Okładki zbiorników ustawisz w panelu admina, a
            „Wydarzenia” pokazują zawsze najnowsze zdjęcie.
          </p>
        </header>

        <div className={styles.albumsGrid}>
          {albums.map((album, idx) => (
            <Link
              key={album.slug}
              href={`/relations/${album.slug}`}
              className={styles.albumCard}
              style={{backgroundImage: `url(${covers[idx]})`}}
              aria-label={`Otwórz album ${album.name}`}
            >
              <div className={styles.albumOverlay} aria-hidden="true" />
              <div className={styles.albumContent}>
                <h2 className={styles.albumName}>{album.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
