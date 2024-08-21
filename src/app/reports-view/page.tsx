import React from "react";
import ReportView from "@/components/report-view";
import reports from "@/data/reports.json";
import type { Report } from "@/components/report-view";

/**
 * Fetches the 
 * @param id the report id
 * @returns report details
 */
const fetchReportByReportNumber = async (incidentReportNumber : number): Promise<Report> => {
  const foundReport : any = reports.find((report) => report.incident_report_number === incidentReportNumber);
  
  if (!foundReport) {
    // Redirect to 404 page
    throw new Response("Not Found", { status: 404 });
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
  
  const report : Report = await fetchReportByReportNumber(1805);

  return (
    <div id="reports-view-page" className="pt-[88px] px-4 w-full">
      <ReportView report={report} />
    </div>
  );
}