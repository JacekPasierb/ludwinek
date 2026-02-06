import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongo";
import Photo from "@/models/Photo";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

type RouteContext = {
  params: Promise<{id: string}>;
};

// DELETE - usuń zdjęcie (tylko dla zalogowanych)
export async function DELETE(req: NextRequest, {params}: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  await connectToDatabase();

  const {id} = await params;

  const photo = await Photo.findByIdAndDelete(id);

  if (!photo) {
    return NextResponse.json({error: "Zdjęcie nie znalezione"}, {status: 404});
  }

  return NextResponse.json({message: "Zdjęcie usunięte"});
}

// PUT - zaktualizuj zdjęcie (tylko dla zalogowanych)
export async function PUT(req: NextRequest, {params}: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  await connectToDatabase();

  const {id} = await params;
  const body = await req.json();

  const photo = await Photo.findByIdAndUpdate(id, body, {new: true});

  if (!photo) {
    return NextResponse.json({error: "Zdjęcie nie znalezione"}, {status: 404});
  }

  return NextResponse.json(photo);
}
