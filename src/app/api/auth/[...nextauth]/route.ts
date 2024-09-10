import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/app/api/auth/sign-up/auth";
import { options } from "./options";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

const handler = async (req: NextRequest) => {
  if (req.method === "POST" && req.nextUrl.pathname === "/api/auth/signup") {
    const body = await req.json();
    const result = await signUp(body);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  }

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
