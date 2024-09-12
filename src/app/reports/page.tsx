"use client";

import { useState, useEffect } from "react";
import ReportList from "@/components/reports/ReportList";
import SearchBar from "@/components/search-bar";

export type ReportSummaryType = {
  id: string;
  report_stage: string;
  report_initiated_at: string;
  incident_report_number: number;
};

type ReportLists = {
  unclaimed: ReportSummaryType[];
  claimed: ReportSummaryType[];
  closed: ReportSummaryType[];
};

async function fetchAllReports(): Promise<ReportLists> {
  const response = await fetch(`/api/get-reports-list`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }
  return response.json();
}

export default function Main() {
  const [reports, setReports] = useState<ReportLists | null>(null);
  const [activeTab, setActiveTab] = useState("unclaimed");

  useEffect(() => {
    fetchAllReports().then(setReports).catch(console.error);
  }, []);

  if (!reports) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="reports-page-container"
      className="overflow-y-scroll flex flex-col gap-4 pt-20 pb-20 px-4"
    >
      <SearchBar page="reports" />
      <ReportList reports={reports} setActiveTab={setActiveTab} />
    </div>
  );
}
