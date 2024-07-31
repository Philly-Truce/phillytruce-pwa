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

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "/reports":
        return "reports";
      case "/messages":
        return "messages";
      case "/edit":
        return "edit";
      case "/create":
        return "create";
      case "/profile":
        return "profile";
      case "/resources":
        return "resources";
      case "/settings":
        return "settings";
      default:
        return "home";
    }
  };

  return (
    <>
      {showTopBanner && <TopBanner page={getPage(pathname)} />}
      <div className="px-4 overflow-y-scroll h-[70vh]">{children}</div>
      {showMenu && <Menu />}
    </>
  );
}
