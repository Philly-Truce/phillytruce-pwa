import React from "react";
import ReportView from "@/components/report-view";
import type { Report } from "@/components/report-view";
import axios from "axios";

/**
 * Fetches a report by incident report number
 * @param incidentReportNumber the report number. 
 * @returns report details in JS object format
 */
const fetchReportByReportNumber = async (incidentReportNumber: string) => {
  const report = await axios.get(`${process.env.BASE_URL}/api/get-report?incident_report_number=${Number.parseInt(incidentReportNumber)}`);
  if (report.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return report.data;
};

/**
 * @param params - get url params in order to fetch data on server-side 
 * @returns Report view
 */
export default async function ReportsViewPage({ params }: { params: { incident_report_number: string } }) {
  // Fetch the report data
  const fetchedReport = await fetchReportByReportNumber(params.incident_report_number).catch(() => null);
  if (!fetchedReport) {
    return <div>Report Not Found</div>;
  }

  const handleStatusUpdate = async () => {
    const response = await axios.post(`${process.env.BASE_URL}/api/update-report-status`, {
      incident_report_number: fetchedReport.foundReport.incident_report_number,
      report_stage: fetchedReport.foundReport.report_stage
    });

    if (response.status === 200) {
      return response.data; // Return the updated report data
    }
  };

  return (
    <div id="reports-view-page" className="pt-[88px] px-4 w-full h-full">
      <ReportView 
      report={fetchedReport.foundReport} 
      onStatusUpdate={handleStatusUpdate} />
    </div>
  );
}
