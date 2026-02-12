import {connectToDatabase} from "@/lib/mongo";
import {getCloudinaryUrl} from "@/lib/cloudinary";
import Photo from "@/models/Photo";
import AlbumsList from "./AlbumsList";
import styles from "../styles/gallery.module.css";

type AlbumSlug = "zbiornik-1" | "zbiornik-2" | "zbiornik-3" | "wydarzenia";
type AlbumCode = "zbiornik1" | "zbiornik2" | "zbiornik3" | "wydarzenia";
type CoverStrategy = "manual-or-newest" | "newest";

type AlbumConfig = {
  slug: AlbumSlug;
  name: string;
  description: string;
  albumCode: AlbumCode;
  coverStrategy: CoverStrategy;
};

type PhotoLean = {
  url?: string;
  publicId?: string | null;
} | null;

type CoverResult = {url: string; publicId: string | null} | string;

const PAGE_TITLE = "Fotorelacje";
const PAGE_SUBTITLE =
  "Przeglądaj zdjęcia z trzech zarybionych zbiorników łowiska Ludwinek — ujęcia z wędkowania, rekordowe okazy, relacje z zawodów wędkarskich i wydarzeń na terenie EKO-TORF. Zobacz, jak wygląda łowisko w praktyce i poczuj klimat tego miejsca.";
const PLACEHOLDER_IMAGE = "/images/logo-ludwinek.png";
const COVER_SIZE = "large" as const;

const ALBUMS: readonly AlbumConfig[] = [
  {
    slug: "zbiornik-1",
    name: "Zbiornik 1",
    description:
      "Spokojne wody pierwszego zbiornika — idealne miejsce na karpie, amury, szczupaki oraz okonie. Zobacz zdjęcia z udanych połowów i klimat tego zakątka łowiska.",
    albumCode: "zbiornik1",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "zbiornik-2",
    name: "Zbiornik 2",
    description:
      "Drugi zbiornik słynie z dużych karpi, rekordowych amurów oraz jesiotrów. Fotorelacje z rekordowych okazów i emocji na brzegu.",
    albumCode: "zbiornik2",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "zbiornik-3",
    name: "Zbiornik 3",
    description:
      "Trzeci zbiornik — cisza, natura i świetne wyniki. Regularnie zarybiany karpiem, amurem, szczupakiem oraz karasiem. Galeria zdjęć z wędkarskich wypraw i pięknych chwil spędzonych nad wodą.",
    albumCode: "zbiornik3",
    coverStrategy: "manual-or-newest",
  },
  {
    slug: "wydarzenia",
    name: "Wydarzenia",
    description:
      "Zawody wędkarskie, pikniki rodzinne i spotkania przy ognisku - ważne wydarzenia na łowisku Ludwinek. Zobacz, jak tętni życiem łowisko EKO-TORF podczas wydarzeń.",
    albumCode: "wydarzenia",
    coverStrategy: "newest",
  },
] as const;

async function fetchAlbumCover(album: AlbumConfig): Promise<CoverResult> {
  await connectToDatabase();

  if (album.coverStrategy === "manual-or-newest") {
    const cover = (await Photo.findOne({
      album: album.albumCode,
      isCover: true,
    })
      .sort({createdAt: -1, _id: -1})
      .lean()) as PhotoLean;

    if (cover?.url) {
      return {url: cover.url, publicId: cover.publicId ?? null};
    }
  }

  const newest = (await Photo.findOne({album: album.albumCode})
    .sort({createdAt: -1, _id: -1})
    .lean()) as PhotoLean;

  if (newest?.url) {
    return {url: newest.url, publicId: newest.publicId ?? null};
  }

  return PLACEHOLDER_IMAGE;
}

function resolveCoverUrl(cover: CoverResult): string {
  if (typeof cover === "string") return cover;
  return getCloudinaryUrl(cover.publicId || cover.url, COVER_SIZE);
}

const RelationsPage = async () => {
  const covers = await Promise.all(
    ALBUMS.map((album) => fetchAlbumCover(album))
  );
  const coverUrls = covers.map((c) => resolveCoverUrl(c));

  return (
    <section className={styles.gallery} aria-labelledby="relations-title">
      <div className="container">
        <header className={styles.header}>
          <h1 id="relations-title" className={styles.title}>
            {PAGE_TITLE}
          </h1>
          <p className={styles.subtitle}>{PAGE_SUBTITLE}</p>
        </header>

        <AlbumsList albums={ALBUMS} coverUrls={coverUrls} />
      </div>
    </section>
  );
};

export default RelationsPage;
