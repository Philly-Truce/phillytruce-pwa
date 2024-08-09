"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  reports: "Reports",
  "reports-view": "Report",
  messages: "Messages",
  edit: "Edit Report",
  create: "Create New Report",
  profile: "Profile",
  resources: "Resources",
  settings: "Settings",
};

export default function TopBanner() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/messages/")) {
      const messageId = pathname.split("/").pop() || "";
      const lastFourChars = messageId.slice(-4);
      return `Message #${lastFourChars}`;
    }
    return pageTitles[pathname] || "Welcome Alyssa!";
  };

  const showTopBanner = !["/login", "/more"].includes(pathname);

  if (!showTopBanner) return null;

  const getLeftChild = () => {
    if (pathname.startsWith("/messages/")) {
      return (
        <Link href="/messages">
          <div id="left-arrow-wrapper" className="m-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>
      );
    }
    return (
      <div
        id="circle-background"
        className="rounded-full w-5 h-5 bg-[#727272] relative flex gap-1 mx-[14px]"
      >
        <div
          id="initials"
          className="absolute text-white text-center text-xs font-bold leading-[100%] tracking-[0.5px] top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
        >
          AV
        </div>
      </div>
    );
  };

  const getRightChild = () => {
    if (pathname.startsWith("/messages/")) {
      return (
        <div id="report-icon-wrapper" className="m-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
              fill="white"
            />
          </svg>
        </div>
      );
    }
    return <div id="placeholder" className="w-5 h-5"></div>;
  };

  return (
    <div
      id="top-banner"
      className="px-4 py-2 bg-primary text-center items-center fixed w-full flex justify-between min-h-16 gap-1"
    >
      {/* Left Child */}
      {getLeftChild()}
      {/* Center Child */}
      <h1
        className={`text-white text-[22px] font-normal leading-7 flex-grow ${
          pathname.startsWith("/messages/") ? "text-left" : ""
        }`}
      >
        {getPageTitle()}
      </h1>
      {/* Right Child */}
      {getRightChild()}
    </div>
  );
}
