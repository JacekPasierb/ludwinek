import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log("❌ Invalid password");
          return null;
        }

        return { id: user._id.toString(), name: user.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
