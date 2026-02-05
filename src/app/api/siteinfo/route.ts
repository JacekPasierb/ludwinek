import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongo";
import SiteInfo from "@/models/SiteInfo";

const EMPTY_RECORD = {species: "", weight: 0, catchDate: ""};

function toCatchDate(r: any): string {
  return (r?.catchDate ?? r?.year ?? "") || "";
}

function normalizeRecordFishes(doc: any): any[] {
  const list = doc?.recordFishes;
  if (!Array.isArray(list))
    return Array(4)
      .fill(null)
      .map(() => ({...EMPTY_RECORD}));
  const out = list.slice(0, 4).map((r: any) => ({
    species: r?.species ?? "",
    weight: r?.weight ?? 0,
    catchDate: toCatchDate(r),
  }));
  while (out.length < 4) out.push({...EMPTY_RECORD});
  return out;
}

export async function GET() {
  await connectToDatabase();
  const info = await SiteInfo.findOne().lean();
  if (!info) return NextResponse.json(null);
  const {recordFish: _removed, ...rest} = info as any;
  const recordFishes = normalizeRecordFishes(info);
  return NextResponse.json({...rest, recordFishes});
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {title, subtitle, recordFishes, infoMessage} = body;

  await connectToDatabase();

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (title) updateData.heroTitle = title;
  if (subtitle) updateData.heroSubtitle = subtitle;
  if (infoMessage !== undefined) updateData.infoMessage = infoMessage;

  let recordFishesToSave:
    | {species: string; weight: number; catchDate: string}[]
    | null = null;
  if (Array.isArray(recordFishes) && recordFishes.length > 0) {
    const arr = recordFishes.slice(0, 4).map((r: any) => ({
      species: String(r?.species ?? "").trim(),
      weight: Number(r?.weight) || 0,
      catchDate: String(r?.catchDate ?? r?.year ?? "").trim(),
    }));
    while (arr.length < 4) arr.push({species: "", weight: 0, catchDate: ""});
    recordFishesToSave = arr;
  }

  let doc = await SiteInfo.findOne();
  if (!doc) {
    doc = new SiteInfo({
      heroTitle: updateData.heroTitle || "Tytuł",
      heroSubtitle: updateData.heroSubtitle || "Podtytuł",
      infoMessage: updateData.infoMessage ?? "",
      recordFishes:
        recordFishesToSave ??
        Array(4)
          .fill(null)
          .map(() => EMPTY_RECORD),
      updatedAt: updateData.updatedAt,
    });
  } else {
    if (updateData.heroTitle) doc.heroTitle = updateData.heroTitle;
    if (updateData.heroSubtitle) doc.heroSubtitle = updateData.heroSubtitle;
    if (updateData.infoMessage !== undefined)
      doc.infoMessage = updateData.infoMessage;
    if (recordFishesToSave !== null) {
      doc.recordFishes = recordFishesToSave as any;
      doc.markModified("recordFishes");
    }
    doc.updatedAt = updateData.updatedAt;
  }
  await doc.save();
  const updated = doc.toObject ? doc.toObject() : (doc as any);
  const recordFishesNorm = normalizeRecordFishes(updated);
  return NextResponse.json({...updated, recordFishes: recordFishesNorm});
}
