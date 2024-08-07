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

  const pathnamesForTopBanner = ["/login", "/more", "/login/otp"];
  const pathnamesForMenu = ["/login", "/login/otp"];

  const showTopBanner = !pathnamesForTopBanner.includes(pathname);
  const showMenu = !pathnamesForMenu.includes(pathname);

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "/login":
        return "login";
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
    <div className="flex flex-col min-h-screen">
      {showTopBanner && <TopBanner page={getPage(pathname)} />}
      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex justify-start p-4">{children}</div>
      </main>
      {showMenu && <Menu />}
    </div>
  );
}
