import React from "react";
import ReportView from "@/components/report-view";
import type { Report } from "@/components/report-view";
import axios from "axios";

/**
 * Fetches a report by incident report number
 * @param incidentReportNumber the report number. 
 * @returns report details in JS object format
 */
const fetchReportByReportNumber = async (incidentReportNumber : string) : Promise<any> => {

  const report = await axios.get(`${process.env.BASE_URL}/api/get-report?incident_report_number=${Number.parseInt(incidentReportNumber)}`)

  if (report.status === 404) {
    // Redirect to 404 page
    throw new Response("Not Found", { status: 404 });
  }

  const data = await report?.data; 

  return data
};

/**
 * @param params - get url params in order to fetch data on server-side 
 * @returns Report view
 */
export default async function ReportsViewPage({ params } : { params: { incident_report_number : string }}) {
  
  const report = await fetchReportByReportNumber(params.incident_report_number);

  return (
    <div id="reports-view-page" className="pt-[88px] px-4 w-full h-full">
      <ReportView report={report.foundReport} />
    </div>
  );
}