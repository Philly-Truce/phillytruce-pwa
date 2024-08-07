import React from "react";
import axios from "axios";
import ReportsView from "@/components/reports-view/index";
import reports from "@/data/reports.json";
import type { Report } from "@/components/reports-view/index";
/**
 *
 * @param id the report id
 * @returns
 */
const fetchReportById = async (id: string): Promise<Report> => {
  if (process.env.NODE_ENV === "development") {
    const foundReport = reports.find((report) => report.id === id);
    if (!foundReport) {
      throw new Error(`Report with id ${id} not found`);
    }
    return {
      ...foundReport,
      date: new Date(foundReport.date),
      connectedReports: [],
    };
  }

  const res = await axios.get(`/api/reports/${id}`);
  return res.data;
};

/**
 *
 * @param params - id of the report
 * @returns Report view
 */
export default async function ReportsViewPage() {
  const report = await fetchReportById("1805");

  return (
    <>
      <div className="pt-6 px-4">
        <ReportsView report={report} />
      </div>
    </>
  );
}
