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
        identifier: { label: "Email or Phone Number", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.identifier) {
          return null;
        }

        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { phoneNumber: credentials.identifier },
            ],
          });
          if (user) {
            return {
              id: user._id.toString(),
              email: user.email,
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

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("User signed in:", user);
    },
    async signOut({ session, token }) {
      console.log("User signed out");
    },
    async createUser({ user }) {
      console.log("New user created:", user);
    },
    async linkAccount({ user, account, profile }) {
      console.log("Account linked to user:", user);
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
};

export default NextAuth(authOptions);
