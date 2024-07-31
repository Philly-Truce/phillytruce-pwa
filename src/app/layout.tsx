"use client";
import "./globals.css";
import TopBanner from "@/components/top-banner";
import Menu from "@/components/menu";
import { usePathname } from "next/navigation";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

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
      <html lang="en">
        <body className={roboto.className}>
          {showTopBanner && <TopBanner />}
          {children}
          {showMenu && <Menu />}
        </body>
      </html>
    </>
  );
}
