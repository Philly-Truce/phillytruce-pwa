"use client";
import Menu from "@/components/menu";
import TopBanner from "@/components/top-banner";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const pathnamesForTopBanner = ["/login", "/more"];

  const showTopBanner = !pathnamesForTopBanner.includes(pathname);
  const showMenu = !(
    pathname === "/login" || pathname.startsWith("/messages/CH")
  );

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "/more":
        return "more";
      case "/reports":
        return "reports";
      case "/reports-view":
        return "reports-view";
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
    <div id="client-layout" className="flex flex-col max-h-screen h-screen">
      {showTopBanner && <TopBanner page={getPage(pathname)} />}
      {/* pt 10 below */}
      <main id="client-layout-inner1" className="flex-grow flex flex-col ">
        <div id="client-layout-inner2" className="flex-grow flex justify-start">
          {children}
        </div>
      </main>
      {showMenu && <Menu />}
    </div>
  );
}
