import Link from "next/link";
import type {Metadata} from "next";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";
import styles from "../../styles/album.module.css";
import LightboxGallery, {type LightboxPhoto} from "../LightboxGallery";

type AlbumSlug = "zbiornik-1" | "zbiornik-2" | "zbiornik-3" | "wydarzenia";
type AlbumCode = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

const slugToAlbum: Record<
  AlbumSlug,
  {name: string; code: AlbumCode; description: string}
> = {
  "zbiornik-1": {
    name: "Zbiornik 1",
    code: "zbiornik1",
    description: "Galeria zdjęć z łowiska Ludwinek — Zbiornik 1.",
  },
  "zbiornik-2": {
    name: "Zbiornik 2",
    code: "zbiornik2",
    description: "Galeria zdjęć z łowiska Ludwinek — Zbiornik 2.",
  },
  "zbiornik-3": {
    name: "Zbiornik 3",
    code: "zbiornik3",
    description: "Galeria zdjęć z łowiska Ludwinek — Zbiornik 3.",
  },
  wydarzenia: {
    name: "Wydarzenia",
    code: "wydarzenia",
    description:
      "Galeria zdjęć z wydarzeń i zawodów wędkarskich na łowisku Ludwinek.",
  },
};

const getPhotosWord = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (n === 1) return "zdjęcie";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
    return "zdjęcia";
  return "zdjęć";
};

export async function generateMetadata(props: {
  params: Promise<{album: AlbumSlug}>;
}): Promise<Metadata> {
  const {album} = await props.params;
  const a = slugToAlbum[album];
  return {
    title: `${a.name} – Fotorelacje`,
    description: a.description,
    alternates: {
      canonical: `/relations/${album}`,
    },
    openGraph: {
      title: `${a.name} – Fotorelacje`,
      description: a.description,
      url: `/relations/${album}`,
      type: "website",
    },
  };
}

export default async function RelationsAlbumPage(props: {
  params: Promise<{album: AlbumSlug}>;
  searchParams: Promise<{page?: string}>;
}) {
  const [{album: albumSlug}, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const album = slugToAlbum[albumSlug as AlbumSlug];
  const page = Math.max(1, Number(searchParams.page || "1"));
  const pageSize = 12;

  await connectToDatabase();

  const query = {album: album.code};
  const total = await Photo.countDocuments(query);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const skip = (safePage - 1) * pageSize;

  const photos = await Photo.find(query)
    .sort({createdAt: -1, _id: -1})
    .skip(skip)
    .limit(pageSize)
    .lean();
  const lightboxPhotos: LightboxPhoto[] = photos.map((p: any) => ({
    url: p.url,
    alt: p.alt || "",
    title: p.title || "",
  }));

  return (
    <section className={styles.album} aria-labelledby="album-title">
      <div className="container">
        <Link className={styles.backButton} href="/relations">
          ← Powrót do albumów
        </Link>

        <header className={styles.header}>
          <h1 id="album-title" className={styles.title}>
            {album.name}
          </h1>
          <p className={styles.count}>
            {total} {getPhotosWord(total)}
          </p>
        </header>

        {photos.length === 0 ? (
          <div className={styles.empty}>
            <p>Brak zdjęć w tym albumie.</p>
          </div>
        ) : (
          <>
            <LightboxGallery photos={lightboxPhotos} albumName={album.name} />

            {pageCount > 1 && (
              <nav className={styles.pagination} aria-label="Paginacja albumu">
                {safePage <= 1 ? (
                  <span
                    className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}
                  >
                    Poprzednia
                  </span>
                ) : (
                  <Link
                    className={styles.pageBtn}
                    href={`/relations/${albumSlug}?page=${safePage - 1}`}
                  >
                    Poprzednia
                  </Link>
                )}

                <div className={styles.pageNumbers}>
                  {Array.from({length: pageCount}, (_, i) => i + 1)
                    .filter((p) => {
                      if (p === 1 || p === pageCount) return true;
                      return Math.abs(p - safePage) <= 1;
                    })
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showDots = prev && p - prev > 1;
                      return (
                        <span key={p} style={{display: "inline-flex"}}>
                          {showDots && (
                            <span className={styles.dots} aria-hidden="true">
                              …
                            </span>
                          )}
                          {p === safePage ? (
                            <span
                              className={`${styles.pageNumber} ${styles.pageActive}`}
                              aria-current="page"
                            >
                              {p}
                            </span>
                          ) : (
                            <Link
                              className={styles.pageNumber}
                              href={`/relations/${albumSlug}?page=${p}`}
                            >
                              {p}
                            </Link>
                          )}
                        </span>
                      );
                    })}
                </div>

                {safePage >= pageCount ? (
                  <span
                    className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}
                  >
                    Następna
                  </span>
                ) : (
                  <Link
                    className={styles.pageBtn}
                    href={`/relations/${albumSlug}?page=${safePage + 1}`}
                  >
                    Następna
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
