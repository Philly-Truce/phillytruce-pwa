import { IoSearchSharp } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import List from "../../components/reports/list";
import Link from "next/link";

export default function Main() {
  return (
    <div className="overflow-y-scroll">
      <section className="my-4">
        <div className="flex items-center justify-between bg-accent rounded-[1.75rem] p-2">
          <div className="flex items-center gap-5">
            <IoSearchSharp />
            <input
              type="text"
              placeholder="search for a report"
              className="bg-transparent"
            />
          </div>
          <IoMicOutline />
        </div>
      </section>
      <List />
      <div className="bottom-4 right-4 float-end">
        <Link href="/create">
          <button className="flex items-center gap-2 p-4 bg-primary text-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]">
            <IoMdAdd />
            New Report
          </button>
        </Link>
      </div>
      {/*  */}
    </div>
  );
}
