import React from "react";
import ReportView from "@/components/reports-view";
import reports from "@/data/reports.json";
import type { Report } from "@/components/reports-view";

/**
 *
 * @param id the report id
 * @returns
 */
const fetchReportById = async (id: number): Promise<Report> => {
  const foundReport = reports.find((report) => report.id === id);
  if (!foundReport) {
    throw new Error(`Report with id ${id} not found`);
  }

  return {
    ...foundReport,
    date: new Date(foundReport.date),
    connectedReports: [],
  };
};

/**
 *
 * @param params - id of the report
 * @returns Report view
 */
export default async function ReportsViewPage() {
  let id: number = 1805;
  const report = await fetchReportById(id);

  return (
    <div id="reports-view-page" className="my-4 px-4">
      <ReportView report={report} />
    </div>
  );
}
