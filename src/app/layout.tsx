import "./globals.css";
import { Roboto } from "next/font/google";
import ClientLayout from "./client-layout";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Philly Truce",
  description:
    "An Extraordinary Web-based Mobile Application that seeks to reduce violence around in the community",
  manifest: "/manifest.json",
};
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
