import "./globals.css";
import { Roboto } from "next/font/google";
import ClientLayout from "./client-layout";
import type { Metadata } from "next";
import { TwilioProvider } from "@/lib/twilio-provider";
import { NotificationProvider } from "@/lib/notification-provider";

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
      <body
        className={`${roboto.className} my-0 max-w-[640px] justify-center items-center mx-auto shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]`}
      >
        <TwilioProvider>
          <NotificationProvider>
            <ClientLayout>{children}</ClientLayout>
          </NotificationProvider>
        </TwilioProvider>
      </body>
    </html>
  );
}
