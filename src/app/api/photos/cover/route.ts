import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";

import {revalidateTag, revalidatePath} from "next/cache";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  await connectToDatabase();

  const body = await req.json();
  const {photoId} = body as {photoId?: string};

  if (!photoId) {
    return NextResponse.json({error: "photoId jest wymagane"}, {status: 400});
  }

  const photo = await Photo.findById(photoId);
  if (!photo) {
    return NextResponse.json({error: "Zdjęcie nie znalezione"}, {status: 404});
  }

  const coverAlbums = ["zbiornik1", "zbiornik2", "zbiornik3"];
  if (!coverAlbums.includes(photo.album)) {
    return NextResponse.json(
      {error: "Okładkę można ustawić tylko dla Zbiornik 1/2/3"},
      {status: 400}
    );
  }

  // Wyłącz poprzednią okładkę w albumie i ustaw nową
  await Photo.updateMany(
    {album: photo.album, isCover: true},
    {$set: {isCover: false}}
  );
  photo.isCover = true;
  await photo.save();

  // ✅ Najważniejsze: odśwież cache strony /relations
  revalidateTag("relations-covers");
  revalidatePath("/relations");

  return NextResponse.json({message: "Ustawiono okładkę", photo});
}
