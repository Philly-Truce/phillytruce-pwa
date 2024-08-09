import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

const handler = async (req: NextRequest) => {
  const { headers, body } = req;
  const nextAuthReq = {
    ...req,
    headers: Object.fromEntries(headers),
    body: await req.text(),
  };

  const res = NextResponse.next();

  await NextAuth(nextAuthReq as any, res as any, authOptions);

  return res;
};

export { handler as GET, handler as POST };
