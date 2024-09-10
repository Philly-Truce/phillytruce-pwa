import { IoMdAdd } from "react-icons/io";
import List from "../../components/reports/list";
import ReportList from '@/components/reports/ReportList'
import Link from "next/link";
import SearchBar from "@/components/search-bar";
import axios from "axios";

export type ReportSummaryType = {
  id: string,
  report_stage: string,
  report_initiated_at: Date,
  incident_report_number: number,
}

const fetchAllReports = async() => {
  const response = await axios.get(`${process.env.BASE_URL}/api/get-reports-list`)
  const data = await response.data

  return data
}

export default async function Main() {

  const reports : any = await fetchAllReports();
  
  return (
    <div
      id="reports-page-container"
      className="overflow-y-scroll flex flex-col gap-4 pt-20 pb-20 px-4"
    >
      <SearchBar page="reports" />
      <ReportList reports={reports}/>
      <div id="new-report-button" className="bottom-10 right-4">
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
