import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import ChatBot from "@/models/ChatBot";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updated = await ChatBot.findByIdAndUpdate(context.params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    await ChatBot.findByIdAndDelete(context.params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
