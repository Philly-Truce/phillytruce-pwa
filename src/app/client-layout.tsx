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
    <div className="flex flex-col min-h-screen">
      {/* {showTopBanner && <TopBanner />} */}
      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </main>
      {showMenu && <Menu />}
    </div>
  );
}
