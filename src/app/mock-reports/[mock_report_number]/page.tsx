import React from "react";
import ReportView from "@/components/report-view";
import type { Report } from "@/components/report-view";

/**
 * Mock function to generate a dummy report
 * @param incidentReportNumber the report number.
 * @returns mock report details in JS object format
 */
const mockFetchReportByReportNumber = async (
  incidentReportNumber: string
): Promise<Report> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockReport: Report = {
    _id: { $oid: "mock_id" } as any,
    incidentReportNumber: parseInt(incidentReportNumber),
    statusType: "unclaimed",
    submittedType: "text-in",
    incidentType: ["Suspicious Activity"],
    location: "123 Main St, Anytown, USA",
    date: new Date(),
    details: "This is a mock incident report for testing purposes.",
    connectedReports: [],
  };

  if (incidentReportNumber === "404") {
    throw new Response("Not Found", { status: 404 });
  }

  return mockReport;
};

/**
 * @param params - get url params in order to fetch data on server-side
 * @returns Report view
 */
export default async function ReportsViewPage({
  params,
}: {
  params: { incident_report_number: string };
}) {
  try {
    const report = await mockFetchReportByReportNumber(
      params.incident_report_number
    );

    return (
      <div id="mock-reports-view-page" className="pt-[88px] px-4 w-full h-full">
        <ReportView report={report} />
      </div>
    );
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return <div>Report not found</div>;
    }

    return <div>An error occurred while fetching the report</div>;
  }
}
