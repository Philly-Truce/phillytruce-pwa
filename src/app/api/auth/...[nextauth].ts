import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "../../../db/mongoDB/user-schema";

mongoose.connect(process.env.DATABASE_URL as string);

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.phoneNumber) {
          return null;
        }

        try {
          const user = await User.findOne({
            phoneNumber: credentials.phoneNumber,
          });
          if (user) {
            return {
              id: user._id.toString(),
              phoneNumber: user.phoneNumber,
            };
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
