"use client";

import TopBanner from "@/components/top-banner";
import Menu from "@/components/menu";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showTopBanner = pathname !== "/login";
  const showMenu = pathname !== "/login";

  return (
    <>
      {showTopBanner && <TopBanner />}
      {children}
      {showMenu && <Menu />}
    </>
  );
}
