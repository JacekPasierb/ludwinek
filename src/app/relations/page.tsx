import Link from "next/link";
import styles from "../styles/gallery.module.css";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";
import {getCloudinaryUrl} from "@/lib/cloudinary";

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

type CoverResult = {url: string; publicId?: string | null};

async function getAlbumCover(album: AlbumRoute): Promise<CoverResult | string> {
  await connectToDatabase();

  const placeholder = "/images/logo-ludwinek.png";
  type PhotoLean = {url?: string; publicId?: string | null} | null;

  if (album.coverStrategy === "manual-or-newest") {
    const cover = (await Photo.findOne({
      album: album.albumCode,
      isCover: true,
    })
      .sort({createdAt: -1, _id: -1})
      .lean()) as any as PhotoLean;
    if (cover?.url) return {url: cover.url, publicId: cover.publicId ?? null};
  }

  const newest = (await Photo.findOne({album: album.albumCode})
    .sort({createdAt: -1, _id: -1})
    .lean()) as any as PhotoLean;
  if (newest?.url) return {url: newest.url, publicId: newest.publicId ?? null};
  return placeholder;
}

export default async function RelacjePage() {
  const covers = await Promise.all(albums.map((a) => getAlbumCover(a)));

  return (
    <section className={styles.gallery} aria-labelledby="relations-title">
      <div className="container">
        <header className={styles.header}>
          <h1 id="relations-title" className={styles.title}>
            Fotorelacje
          </h1>
          <p className={styles.subtitle}>
            Przeglądaj zdjęcia z trzech zarybionych zbiorników łowiska Ludwinek
            — ujęcia z wędkowania, rekordowe okazy, relacje z zawodów
            wędkarskich i wydarzeń na terenie EKO-TORF. Zobacz, jak wygląda
            łowisko w praktyce i poczuj klimat tego miejsca.
          </p>
        </header>

        <div className={styles.albumsGrid}>
          {albums.map((album, idx) => {
            const cover = covers[idx];
            const coverUrl =
              typeof cover === "string"
                ? cover
                : getCloudinaryUrl(cover.publicId || cover.url, "medium");
            return (
              <Link
                key={album.slug}
                href={`/relations/${album.slug}`}
                className={styles.albumCard}
                style={{backgroundImage: `url(${coverUrl})`}}
                aria-label={`Otwórz album ${album.name}`}
              >
                <div className={styles.albumOverlay} aria-hidden="true" />
                <div className={styles.albumContent}>
                  <h2 className={styles.albumName}>{album.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
