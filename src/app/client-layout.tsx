"use client";
import Menu from "@/components/global/menu";
import TopBanner from "@/components/global/top-banner";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const pathnamesForTopBanner = ["/more"];
  const pathnamesForMenu = ["/login", "/login-otp"];
  const pathnamesForRoundedXL = ["/login", "/login-otp"];

  const showTopBanner = !pathnamesForTopBanner.includes(pathname);
  const showMenu = !pathnamesForMenu.includes(pathname);
  const applyRoundedXL = pathnamesForRoundedXL.includes(pathname);

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "login";
      case "/login-otp":
        return "login-otp";
      case "/home":
        return "home";
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
        return "login";
    }
  };

  return (
    <div
      className={`flex flex-col h-[95vh] my-5 ${
        applyRoundedXL ? "rounded-xl" : ""
      }`}
    >
      {showTopBanner && <TopBanner page={getPage(pathname)} />}
      <main className="flex-grow flex flex-col overflow-y-scroll">
        <div className="flex-grow flex justify-start p-4">{children}</div>
      </main>
      {showMenu && <Menu />}
    </div>
  );
}
