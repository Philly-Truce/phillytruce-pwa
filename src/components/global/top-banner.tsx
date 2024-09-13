"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from 'next/image'

const pageTitles: Record<string, string> = {
  "/reports": "Reports",
  "/reports-view": "Report",
  "/sign-up": "Sign Up",
  "/messages": "Messages",
  "/edit": "Edit Report",
  "/create": "Create New Report",
  "/profile": "Profile",
  "/resources": "Resources",
  "/settings": "Settings",
};

const LeftArrow = () => (
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
);

const ReportIcon = () => (
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
);

export default function TopBanner() {
  const pathname = usePathname();
  const query = useSearchParams()

  if (["/login", "/login-otp", "/more"].includes(pathname)) return null;

  const getPageTitle = () => {
    if (pathname.startsWith("/messages/")) {
      const lastFourChars = pathname.slice(-4);
      return `Message #${lastFourChars}`;
    }
    return pageTitles[pathname] || "Welcome Alyssa!";
  };

  /**
   * Renders different icons depending on the pathname
   */
  const getLeftChild = () => {
    if (pathname.startsWith("/messages/") || pathname.startsWith("/profile") || 
        pathname.startsWith("/reports/") || pathname.startsWith("/create") || 
        pathname.startsWith("/edit") || pathname.startsWith("/reports-view")) {

        // Determine the href based on the pathname
        const href = pathname.startsWith("/messages/") ? "/messages" :
        pathname.startsWith("/reports-view") || pathname.startsWith("/reports/") ? "/reports" :
        pathname.startsWith("/create") ? "/reports" : 
        "/reports";

        return (
          <Link href={href}>
            <div id="left-arrow-wrapper" className="m-3">
              <LeftArrow />
            </div>
          </Link>
        );
    } 

    return (
      <div
        id="circle-background"
        className="rounded-full w-[34px] h-[34px] bg-[#727272] relative flex gap-1"
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
          <ReportIcon />
        </div>
      );
    }
    
    if(pathname.startsWith("/reports/") || pathname.startsWith("/reports-view")) {
     return (
      <div id="report-icon-wrapper" className="flex flex-row justify-center items-center">
        <button 
          className="disabled:opacity-50 h-12 w-12 p-3 flex flex-col items-center justify-center" 
          title="Edit report" 
          disabled={query.get('report_stage') === 'unclaimed'} 
          onClick={() => window.location.href = "/edit"} // Redirect to edit
        >
          <Image src='/icons/edit.svg' width={48} height={48} alt="Edit icon" />
        </button>
        <button 
          className="disabled:opacity-50 h-12 w-12 p-3 flex flex-col items-center justify-center" 
          title="Go to messages for this report" 
          disabled={query.get('report_stage') === 'unclaimed'} 
          onClick={() => window.location.href = "/messages"} // Redirect to messages
        >
          <Image src='/icons/message.svg' width={48} height={48} alt="Message Icon" />
        </button>
      </div>
     )
    }

    return <div id="placeholder" className="w-5 h-5"></div>;
  };

  return (
    <div
      id="top-banner"
      className="px-[18px] py-2 bg-primary text-center items-center fixed w-full flex justify-between min-h-16 gap-1 max-w-[640px]"
    >
      {getLeftChild()}
      <h1
        className={`text-white text-[22px] font-normal leading-7 flex-grow ${
          pathname.startsWith("/messages/") || pathname.startsWith("/profile")
            ? "text-left"
            : ""
        }`}
      >
        {getPageTitle()}
      </h1>
      {getRightChild()}
    </div>
  );
}
