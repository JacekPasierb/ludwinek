import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

// GET - pobierz wszystkie zdjęcia lub filtruj po albumie
export async function GET(req: NextRequest) {
  await connectToDatabase();

  const {searchParams} = new URL(req.url);
  const album = searchParams.get("album");
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1;
  const pageSize = pageSizeParam ? Math.max(1, Number(pageSizeParam)) : null;

  const query = album ? {album} : {};

  // Domyślnie: od najnowszych do najstarszych
  let q = Photo.find(query).sort({createdAt: -1, _id: -1});
  if (Number.isFinite(limit) && (limit as number) > 0) {
    // Specjalna logika okładek dla kafelków albumów:
    // - zbiornik1/2/3: jeśli jest ustawiona okładka → zwróć ją, inaczej najnowsze
    // - wydarzenia: zawsze najnowsze
    if (album && (limit as number) === 1) {
      const coverAlbums = ["zbiornik1", "zbiornik2", "zbiornik3"];
      if (coverAlbums.includes(album)) {
        const cover = await Photo.findOne({album, isCover: true}).sort({
          createdAt: -1,
          _id: -1,
        });
        if (cover) return NextResponse.json([cover]);
      }
      const newest = await Photo.findOne({album}).sort({
        createdAt: -1,
        _id: -1,
      });
      return NextResponse.json(newest ? [newest] : []);
    }

    q = q.limit(limit as number);
    const photos = await q;
    return NextResponse.json(photos);
  }

  // Paginacja (gdy podano pageSize)
  if (pageSize && Number.isFinite(pageSize)) {
    const total = await Photo.countDocuments(query);
    const skip = (page - 1) * pageSize;

    const items = await q.skip(skip).limit(pageSize);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      pageCount,
    });
  }

  // Bez paginacji: zwracamy wszystko
  const photos = await q;
  return NextResponse.json(photos);
}

// POST - dodaj nowe zdjęcie (tylko dla zalogowanych)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  await connectToDatabase();

  const body = await req.json();
  const {album, url, alt, title, order} = body;

  if (!album || !url) {
    return NextResponse.json({error: "Album i URL są wymagane"}, {status: 400});
  }

  const validAlbums = ["zbiornik1", "zbiornik2", "zbiornik3", "wydarzenia"];
  if (!validAlbums.includes(album)) {
    return NextResponse.json({error: "Nieprawidłowy album"}, {status: 400});
  }

  const photo = new Photo({
    album,
    url,
    alt: alt || "",
    title: title || "",
    order: order || 0,
  });

  await photo.save();

  return NextResponse.json(photo, {status: 201});
}
