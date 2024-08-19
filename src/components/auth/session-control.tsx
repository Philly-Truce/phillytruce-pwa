import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function SessionControl() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return session; 
}
