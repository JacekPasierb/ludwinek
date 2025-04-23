import NextAuth, {type AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToDatabase} from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// 👇 dodaj typ AuthOptions
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        console.log("C", credentials);

        if (!credentials) return null;

        await connectToDatabase();

        const user = await User.findOne({username: credentials.username});

        if (!user) {
          console.log("❌ User not found");

          return null;
        }
      

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          console.log("❌ Invalid password");
          return null; // lub throw new Error("Invalid password");
        }

        return {id: user._id.toString(), name: user.username};
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
