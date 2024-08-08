import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [],
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export { authHandler as GET, authHandler as POST };
