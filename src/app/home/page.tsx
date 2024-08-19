import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SessionControl from "@/components/auth/session-control";

export default async function Home() {

  const session = await SessionControl();
  
  return (
    <div id="home-page" className="pt-16">
      <h1>Welcome, this is the home page.</h1>
    </div>
  );
}
