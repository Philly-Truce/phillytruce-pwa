import "./globals.css";
import { Roboto } from "next/font/google";
import ClientLayout from "./client-layout";
import type { Metadata } from "next";
import { TwilioProvider } from "@/lib/twilio-provider";

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
    <html lang="ens">
      <body
        className={`${roboto.className} my-0 w-full justify-center items-center mx-auto shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]`}
      >
        <TwilioProvider>
          <ClientLayout>{children}</ClientLayout>
        </TwilioProvider>
      </body>
    </html>
  );
}
