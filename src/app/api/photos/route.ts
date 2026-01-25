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

  const query = album ? {album} : {};

  const photos = await Photo.find(query).sort({order: 1, createdAt: -1});

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
