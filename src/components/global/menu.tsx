"use client";
import { MdHome, MdOutlineMessage } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/home", Icon: MdHome, label: "Home" },
  { href: "/reports", Icon: CgNotes, label: "Reports" },
  { href: "/messages", Icon: MdOutlineMessage, label: "Message" },
  { href: "/more", Icon: IoIosMore, label: "More" },
];

export default function Menu() {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/login-otp" ||
    pathname.startsWith("/messages/CH")
  ) {
    return null;
  }

  return (
    <div className="flex justify-center space-x-7 px-10 pt-3 pb-5 rounded-b-2xl shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
      {menuItems.map(({ href, Icon, label }) => (
        <Link href={href} key={href}>
          <button className="space-y-2">
            <Icon className="mx-auto" />
            <span>{label}</span>
          </button>
        </Link>
      ))}
    </div>
  );
}
