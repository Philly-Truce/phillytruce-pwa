import { IoMdAdd } from "react-icons/io";
import List from "../../components/reports/list";
import Link from "next/link";
import SearchBar from "@/components/search-bar";

export default function Main() {
  return (
    <div
      id="reports-page-container"
      className="overflow-y-scroll flex flex-col gap-4 pt-20 px-4"
    >
      <SearchBar page="reports" />
      <List />
      <div id="new-report-button" className="bottom-4 right-4 float-end">
        <Link href="/create">
          <button className="flex items-center gap-2 p-4 bg-primary text-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px] ml-auto">
            <IoMdAdd />
            New Report
          </button>
        </Link>
      </div>
    </div>
  );
}
