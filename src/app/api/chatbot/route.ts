import {NextResponse} from "next/server";
import {connectToDatabase} from "../../../lib/mongo";
import ChatBot from "../../../models/ChatBot";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await ChatBot.find();
    return NextResponse.json({success: true, data});
  } catch (error) {
    return NextResponse.json({success: false, error}, {status: 500});
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newEntry = await ChatBot.create(body);
    return NextResponse.json({success: true, data: newEntry});
  } catch (error) {
    return NextResponse.json({success: false, error}, {status: 500});
  }
}
