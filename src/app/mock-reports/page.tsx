import { IoMdAdd } from "react-icons/io";
import List from "../../components/reports/list";
import Link from "next/link";
import SearchBar from "@/components/search-bar";

export default function MockReportsMain() {
  return (
    <div
      id="mock-reports-page-container"
      className="overflow-y-scroll flex flex-col gap-4 pt-20 px-4"
    >
      <SearchBar page="reports" />
      <List />
    </div>
  );
}
