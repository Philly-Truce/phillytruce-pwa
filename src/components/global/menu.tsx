"use client";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useTwilio } from "@/lib/twilio-provider";
import { NotificationContext } from "@/lib/notification-provider";

const menuItems = [
  {
    href: "/home",
    icon: (selected: boolean) => (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.375 6.19L17.375 10.69V18.5H15.375V12.5H9.375V18.5H7.375V10.69L12.375 6.19ZM12.375 3.5L2.375 12.5H5.375V20.5H11.375V14.5H13.375V20.5H19.375V12.5H22.375L12.375 3.5Z"
          fill={selected ? "#1C4587" : "#233251"}
        />
      </svg>
    ),
    label: "Home",
  },
  {
    href: "/reports",
    icon: (selected: boolean) => (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.125 16H16.125V18H8.125V16ZM8.125 12H16.125V14H8.125V12ZM14.125 2H6.125C5.025 2 4.125 2.9 4.125 4V20C4.125 21.1 5.015 22 6.115 22H18.125C19.225 22 20.125 21.1 20.125 20V8L14.125 2ZM18.125 20H6.125V4H13.125V9H18.125V20Z"
          fill={selected ? "#1C4587" : "#334155"}
        />
      </svg>
    ),
    label: "Reports",
  },
  {
    href: "/messages",
    icon: (selected: boolean) => (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.875 4H20.875V16H6.045L4.875 17.17V4ZM4.875 2C3.775 2 2.885 2.9 2.885 4L2.875 22L6.875 18H20.875C21.975 18 22.875 17.1 22.875 16V4C22.875 2.9 21.975 2 20.875 2H4.875ZM6.875 12H18.875V14H6.875V12ZM6.875 9H18.875V11H6.875V9ZM6.875 6H18.875V8H6.875V6Z"
          fill={selected ? "#1C4587" : "#334155"}
        />
      </svg>
    ),
    label: "Message",
  },
  {
    href: "/more",
    icon: (selected: boolean) => (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.625 10C5.525 10 4.625 10.9 4.625 12C4.625 13.1 5.525 14 6.625 14C7.725 14 8.625 13.1 8.625 12C8.625 10.9 7.725 10 6.625 10ZM18.625 10C17.525 10 16.625 10.9 16.625 12C16.625 13.1 17.525 14 18.625 14C19.725 14 20.625 13.1 20.625 12C20.625 10.9 19.725 10 18.625 10ZM10.625 12C10.625 10.9 11.525 10 12.625 10C13.725 10 14.625 10.9 14.625 12C14.625 13.1 13.725 14 12.625 14C11.525 14 10.625 13.1 10.625 12Z"
          fill={selected ? "#1C4587" : "#334155"}
        />
      </svg>
    ),
    label: "More",
  },
];

export default function Menu({ hasOverflow }: { hasOverflow: boolean }) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { unreadChatsCount } = useTwilio();
  const { unreadReportsCount } = useContext(NotificationContext);

  const updateHighlightStyle = (index: number) => {
    if (menuRef.current) {
      const activeItem = menuRef.current.children[index + 1].querySelector(
        "#icon-wrapper"
      ) as HTMLElement;
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;
        setHighlightStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  };

  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      updateHighlightStyle(currentIndex);

      const timer = setTimeout(() => {
        setIsInitialRender(false);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (
    pathname === "/login" ||
    pathname === "/sign-up-otp-mobile" ||
    pathname.startsWith("/messages/CH") ||
    pathname === "/sign-up"
  ) {
    return null;
  }

  return (
    <div id="bottom-navigation-menu" className="relative">
      {pathname === "/reports" && (
        <div id="new-report-button" className="absolute -top-16 right-4">
          <Link href="/create">
            <button className="flex items-center gap-2 p-4 bg-primary text-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]">
              <IoMdAdd />
              New Report
            </button>
          </Link>
        </div>
      )}
      <div
        className={`relative flex justify-between pb-3 px-[7px] ${
          hasOverflow
            ? "shadow-[1px_-2px_15px_6px_rgba(0,0,0,0.16),0px_1px_4px_1px_rgba(0,0,0,0.11)]"
            : "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        }`}
        ref={menuRef}
      >
        <div
          id="selector-blob"
          className={`absolute top-3 h-8 bg-[#bbc7db] rounded-2xl z-10 ${
            isInitialRender ? "" : "transition-all duration-300 ease-in-out"
          }`}
          style={highlightStyle}
        />
        {menuItems.map(({ href, icon, label }) => {
          const isSelected = pathname === href;
          return (
            <Link href={href} key={href}>
              <div
                id="icon-label-wrapper"
                className="pt-3 pb-4 flex flex-col items-center gap-1"
              >
                <div id="icon-double-wrap" className="z-20 px-[15.38px]">
                  <div
                    id="icon-wrapper"
                    className={`px-5 py-1 rounded-2xl text-center relative`}
                  >
                    {/* Icon */}
                    {icon(isSelected)}
                    {/* Notification Badge */}
                    <div
                      id="notification-badge"
                      className={`absolute w-4 h-4 top-0 left-8 rounded-full ${
                        (href === "/mock-reports" && unreadReportsCount > 0) ||
                        (href === "/messages" && unreadChatsCount > 0)
                          ? "bg-[#F6893C]"
                          : "invisible"
                      }`}
                    >
                      <div
                        id="notification-number"
                        className="text-white text-center text-[11px] font-medium leading-4 tracking-[0.5px]"
                      >
                        {unreadReportsCount}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="menu-label"
                  className={`text-center text-xs font-medium leading-4 tracking-[0.5px] ${
                    isSelected ? "text-[#1C4587]" : "text-[#334155]"
                  }`}
                >
                  {label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
