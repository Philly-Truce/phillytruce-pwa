import ReportList from "@/components/reports/ReportList";
import SearchBar from "@/components/search-bar";
import prisma from "@/db/prisma";

export type ReportSummaryType = {
  id: string;
  report_stage: string;
  report_initiated_at: Date;
  incident_report_number: number;
};

const fetchAllReports = async () => {
  const reports = await prisma.report.findMany({
    select: {
      report_stage: true,
      incident_report_number: true,
      id: true,
      report_initiated_at: true,
    },
  });

  console.log("Fetched reports:", reports);
  return reports;
};

export default async function Main() {
  const reports = await fetchAllReports();

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
