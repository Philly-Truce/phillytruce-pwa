"use client";
import React, { useState } from "react";
import { mockReportData, MockReport } from "@/data/mock-report";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";

const MockReportsBrief: React.FC = () => {
  const [clickedReports, setClickedReports] = useState<string[]>([]);

  const handleClick = (reportName: string) => {
    if (!clickedReports.includes(reportName)) {
      setClickedReports([...clickedReports, reportName]);
    }
  };

  return (
    <div id="mock-reports-brief" className="">
      {mockReportData.map((report: MockReport, index: number) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4 flex justify-between items-center"
          onClick={() => handleClick(report.reportName)}
          style={{
            fontWeight: clickedReports.includes(report.reportName)
              ? "normal"
              : "bold",
          }}
        >
          <div>
            <h2 className="text-md">{report.reportName}</h2>
            <p className="text-sm">{report.reportDate}</p>
          </div>
          {report.reportNumber ? (
            <Link href={`/mock-reports/${report.reportNumber}`}>
              <button className="flex gap-5 items-center">
                <p className="font-bold text-sm">View Report</p>
                <SlArrowRight />
              </button>
            </Link>
          ) : (
            <button className="flex gap-5 items-center opacity-50" disabled>
              <p className="font-bold text-sm">No Report Number</p>
              <SlArrowRight />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MockReportsBrief;
