import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {connectToDatabase} from "@/lib/mongo";
import ChatBot from "@/models/ChatBot";

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {error: "Musisz być zalogowany, aby dodawać wpisy chatbota."},
      {status: 401}
    );
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const newEntry = await ChatBot.create(body);
    return NextResponse.json({success: true, data: newEntry});
  } catch (error) {
    return NextResponse.json({success: false, error}, {status: 500});
  }
}
