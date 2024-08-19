"use client"; // Ensure this is a client component

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) signIn(); // Redirect to sign-in page if not authenticated
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>This page is protected and you are signed in.</div>;
}
