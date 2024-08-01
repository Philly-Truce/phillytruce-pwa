import { MdHome } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import Link from "next/link";

export default function Menu() {
  const center = "mx-auto";
  const gap = "space-y-2";
  return (
    <div className="space-x-7 justify-center px-10 pt-3 pb-5 rounded-b-2xl shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
      <button className={gap}>
        <MdHome className={center} />
        <span>Home</span>
      </button>
      <button className={gap}>
        <CgNotes className={center} />
        Reports
      </button>
      <Link href="/messages">
        <button className={gap}>
          <MdOutlineMessage className={center} />
          Message
        </button>
      </Link>
      <button className={gap}>
        <IoIosMore className={center} />
        More
      </button>
    </div>
  );
}
