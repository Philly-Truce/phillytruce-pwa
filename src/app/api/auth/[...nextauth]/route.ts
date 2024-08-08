import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from "next";

export const authOptions: NextAuthOptions = {
  providers: [],
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
