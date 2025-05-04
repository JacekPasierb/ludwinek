import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongo";
import SiteInfo from "@/models/SiteInfo";

export async function GET() {
  await connectToDatabase();
  const info = await SiteInfo.findOne();
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {title, subtitle, recordFish} = body;

  await connectToDatabase();

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (title) updateData.heroTitle = title;
  if (subtitle) updateData.heroSubtitle = subtitle;
  if (recordFish) {
    updateData.recordFish = {
      species: recordFish.species || "",
      weight: recordFish.weight || 0,

      year: recordFish.year || "",
    };
  }

  const updated = await SiteInfo.findOneAndUpdate({}, updateData, {
    new: true,
    upsert: true,
  });

  return NextResponse.json(updated);
}
