import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {connectToDatabase} from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const MIN_PASSWORD_LENGTH = 8;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return NextResponse.json(
      {error: "Musisz być zalogowany, aby zmienić hasło."},
      {status: 401}
    );
  }

  let body: {currentPassword?: string; newPassword?: string};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {error: "Nieprawidłowy format żądania."},
      {status: 400}
    );
  }

  const {currentPassword, newPassword} = body;

  if (!currentPassword || typeof currentPassword !== "string") {
    return NextResponse.json(
      {error: "Obecne hasło jest wymagane."},
      {status: 400}
    );
  }

  if (!newPassword || typeof newPassword !== "string") {
    return NextResponse.json(
      {error: "Nowe hasło jest wymagane."},
      {status: 400}
    );
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      {
        error: `Nowe hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków.`,
      },
      {status: 400}
    );
  }

  await connectToDatabase();

  const user = await User.findOne({username: session.user.name});
  if (!user) {
    return NextResponse.json(
      {error: "Nie znaleziono użytkownika."},
      {status: 404}
    );
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json(
      {error: "Obecne hasło jest nieprawidłowe."},
      {status: 401}
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({success: true});
}
