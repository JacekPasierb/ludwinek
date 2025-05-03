import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import ChatBot from "@/models/ChatBot";

// EDYCJA
export async function PUT(req: NextRequest,  context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id } = await context.params;
    const updated = await ChatBot.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    await ChatBot.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
