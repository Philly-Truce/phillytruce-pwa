"use client"
import React, { useContext, useState } from "react";
import { mockReportData, MockReport } from "@/data/mock-report";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import type { ReportSummaryType } from "@/app/reports/page";
import { NotificationContext } from "@/lib/notification-provider";

export const ReportSummary: React.FC<{ 
  report: ReportSummaryType, 
  onClick : any, 
  clickedReports : any
  }>  = ({ report, onClick, clickedReports }) => {

    const { unreadReports } = useContext(NotificationContext)

    console.log(unreadReports)
  return (  
      <div
      key={report.id}
      className={`border-b w-full h-20 border-gray-200 py-4 flex flex-row items-center ${clickedReports.includes(report.incident_report_number) ? 'font-normal' : 'font-bold'}`}
      onClick={(event) => onClick(report.incident_report_number, event)}
      >
      <div className="w-4 h-full flex flex-col items-center justify-center">
        {unreadReports.some(unreadReport => unreadReport.id === report.id) && 
        <div className="bg-status-notification rounded-full w-4 h-4"></div>
        }
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="h-12 flex flex-col justify-between ml-4">
          <h2 className="text-md">Report #{report.incident_report_number}</h2>
          <p className="text-sm">{report?.report_initiated_at ? new Date(report.report_initiated_at).toLocaleDateString() : 'N/A'}</p>
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
    </div>)
}