import React, { useState } from "react";
import { mockReportData, MockReport } from "@/data/mock-report";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import type { ReportSummaryType } from "@/app/reports/page";

export const ReportSummary: React.FC<{ report: ReportSummaryType }> = ({ report }) => (
        <div
          key={report.id}
          className="border-b border-gray-200 py-4 flex justify-between items-center"
        //   onClick={() => handleClick(report.incident_report_number)}
        
        //   style={{
        //     fontWeight: clickedReports.includes(report.incident_report_number)
        //       ? "normal"
        //       : "bold",
        //   }}
        >
          <div>
            <h2 className="text-md">{report.incident_report_number}</h2>
            <p className="text-sm">{report.incident_report_number}</p>
          </div>
          {report.incident_report_number ? (
            <Link href={`/reports/${report.incident_report_number}`}>
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
)