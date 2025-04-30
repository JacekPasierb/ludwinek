import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongo";
import Chatbot from "../../../../models/ChatBot";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  await Chatbot.findByIdAndUpdate(params.id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Chatbot.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
