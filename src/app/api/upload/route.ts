import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

// POST - upload zdjęcia do Cloudinary
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({error: "Brak pliku"}, {status: 400});
    }

    // Sprawdź typ pliku
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({error: "Plik musi być obrazem"}, {status: 400});
    }

    // Sprawdź rozmiar (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {error: "Plik jest za duży (max 10MB)"},
        {status: 400}
      );
    }

    // Przygotuj plik do uploadu
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload do Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    // Tworzymy FormData dla Cloudinary
    const cloudinaryFormData = new FormData();
    // Cloudinary akceptuje plik jako base64 string w polu "file"
    const base64 = buffer.toString("base64");
    cloudinaryFormData.append("file", `data:${file.type};base64,${base64}`);
    cloudinaryFormData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET!
    );
    cloudinaryFormData.append("folder", "ludwinek");

    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!cloudinaryResponse.ok) {
      const error = await cloudinaryResponse.json();
      console.error("Cloudinary error:", error);
      return NextResponse.json(
        {error: "Błąd podczas uploadu do chmury"},
        {status: 500}
      );
    }

    const cloudinaryData = await cloudinaryResponse.json();

    return NextResponse.json({
      url: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
      width: cloudinaryData.width,
      height: cloudinaryData.height,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {error: "Błąd podczas przetwarzania pliku"},
      {status: 500}
    );
  }
}
