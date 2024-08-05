"use client";

import Menu from "@/components/menu";
import TopBanner from "@/components/top-banner";
import { usePathname } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const pathnamesForTopBanner = ["/login", "/more"];
  const pathnamesForMenu = ["/login"];

  const showTopBanner = !pathnamesForTopBanner.includes(pathname);
  const showMenu = !pathnamesForMenu.includes(pathname);

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "/more":
        return "more";
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

  if (usePathname() == "/login") {
    return (
      <>
        <div className="px-4 h-[70vh] pt-36">{children}</div>
      </>
    );
  } else {
    return (
      <>
        {showTopBanner && <TopBanner page={getPage(pathname)} />}
        <div className="px-4 overflow-y-scroll h-[70vh]">{children}</div>
        {showMenu && <Menu />}
      </>
    );
  }
}
