import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";
import styles from "../../styles/album.module.css";
import LightboxGallery, {type LightboxPhoto} from "../LightboxGallery";

type AlbumSlug = "zbiornik-1" | "zbiornik-2" | "zbiornik-3" | "wydarzenia";
type AlbumCode = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";

type AlbumConfig = {
  name: string;
  code: AlbumCode;
  description: string;
};

type PhotoLean = {
  url?: string;
  publicId?: string | null;
  alt?: string;
  title?: string;
};

const RELATIONS_PATH = "/relations";
const PAGE_SIZE = 12;
const BACK_LABEL = "← Powrót do albumów";
const EMPTY_MESSAGE = "Brak zdjęć w tym albumie.";
const METADATA_SUFFIX = " – Fotorelacje";

const ALBUM_CONFIG: Record<AlbumSlug, AlbumConfig> = {
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
} as const;

const VALID_SLUGS = Object.keys(ALBUM_CONFIG) as AlbumSlug[];

function getPhotoCountLabel(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (count === 1) return "zdjęcie";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return "zdjęcia";
  }
  return "zdjęć";
}

function getVisiblePageNumbers(
  pageCount: number,
  currentPage: number
): (number | "dots")[] {
  const pages: (number | "dots")[] = [];
  let lastNum = 0;
  for (let p = 1; p <= pageCount; p++) {
    const isFirst = p === 1;
    const isLast = p === pageCount;
    const isNearCurrent = Math.abs(p - currentPage) <= 1;
    if (isFirst || isLast || isNearCurrent) {
      if (lastNum > 0 && p - lastNum > 1) {
        pages.push("dots");
      }
      pages.push(p);
      lastNum = p;
    }
  }
  return pages;
}

function buildAlbumPageUrl(slug: AlbumSlug, page: number): string {
  return `${RELATIONS_PATH}/${slug}${page > 1 ? `?page=${page}` : ""}`;
}

function mapToLightboxPhoto(p: PhotoLean): LightboxPhoto {
  return {
    url: p.url ?? "",
    publicId: p.publicId ?? null,
    alt: p.alt ?? "",
    title: p.title ?? "",
  };
}

export async function generateMetadata(props: {
  params: Promise<{album: string}>;
}): Promise<Metadata> {
  const {album} = await props.params;
  const config = VALID_SLUGS.includes(album as AlbumSlug)
    ? ALBUM_CONFIG[album as AlbumSlug]
    : null;

  if (!config) {
    return {title: "Album"};
  }

  return {
    title: `${config.name}${METADATA_SUFFIX}`,
    description: config.description,
    alternates: {canonical: `${RELATIONS_PATH}/${album}`},
    openGraph: {
      title: `${config.name}${METADATA_SUFFIX}`,
      description: config.description,
      url: `${RELATIONS_PATH}/${album}`,
      type: "website",
    },
  };
}

const RelationsAlbumPage = async (props: {
  params: Promise<{album: string}>;
  searchParams: Promise<{page?: string}>;
}) => {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const slug = params.album as AlbumSlug;
  const album = ALBUM_CONFIG[slug];

  if (!album) {
    notFound();
  }

  const rawPage = Number(searchParams.page || "1");
  const page = Math.max(1, rawPage);

  await connectToDatabase();

  const query = {album: album.code};
  const total = await Photo.countDocuments(query);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const skip = (safePage - 1) * PAGE_SIZE;

  const photos = (await Photo.find(query)
    .sort({createdAt: -1, _id: -1})
    .skip(skip)
    .limit(PAGE_SIZE)
    .lean()) as PhotoLean[];

  const lightboxPhotos = photos.map(mapToLightboxPhoto);

  return (
    <section className={styles.album} aria-labelledby="album-title">
      <div className="container">
        <Link className={styles.backButton} href={RELATIONS_PATH}>
          {BACK_LABEL}
        </Link>

        <header className={styles.header}>
          <h1 id="album-title" className={styles.title}>
            {album.name}
          </h1>
          <p className={styles.count}>
            {total} {getPhotoCountLabel(total)}
          </p>
        </header>

        {photos.length === 0 ? (
          <div className={styles.empty}>
            <p>{EMPTY_MESSAGE}</p>
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
                    href={buildAlbumPageUrl(slug, safePage - 1)}
                  >
                    Poprzednia
                  </Link>
                )}

                <div className={styles.pageNumbers}>
                  {getVisiblePageNumbers(pageCount, safePage).map((item, idx) =>
                    item === "dots" ? (
                      <span
                        key={`dots-${idx}`}
                        style={{display: "inline-flex"}}
                      >
                        <span className={styles.dots} aria-hidden>
                          …
                        </span>
                      </span>
                    ) : (
                      <span key={item} style={{display: "inline-flex"}}>
                        {item === safePage ? (
                          <span
                            className={`${styles.pageNumber} ${styles.pageActive}`}
                            aria-current="page"
                          >
                            {item}
                          </span>
                        ) : (
                          <Link
                            className={styles.pageNumber}
                            href={buildAlbumPageUrl(slug, item)}
                          >
                            {item}
                          </Link>
                        )}
                      </span>
                    )
                  )}
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
                    href={buildAlbumPageUrl(slug, safePage + 1)}
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
};

export default RelationsAlbumPage;
