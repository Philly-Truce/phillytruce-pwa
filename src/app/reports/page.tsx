import { NextRequest, NextResponse } from "next/server";
import ReportList from "@/components/reports/ReportList";
import SearchBar from "@/components/search-bar";

export type ReportSummaryType = {
  id: string;
  report_stage: string;
  report_initiated_at: Date;
  incident_report_number: number;
};

const fetchAllReports = async () => {
  const response = await fetch(`/api/get-reports-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return response.json();
};

export default async function Main() {
  const reports: ReportSummaryType[] = await fetchAllReports();

  return (
    <div
      id="reports-page-container"
      className="overflow-y-scroll flex flex-col gap-4 pt-20 pb-20 px-4"
    >
      <SearchBar page="reports" />
      <ReportList reports={reports} />
    </div>
  );
}
