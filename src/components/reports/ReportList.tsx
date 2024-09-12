"use client"
import { useContext, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/shadcn-ui/tabs";
  import MockReportsBrief from "@/data/reports-brief-mock";
  import { ReportSummaryType } from "@/app/reports/page";
  import { ReportSummary } from "./ReportSummary";
import { NotificationContext } from "@/lib/notification-provider";
  
  export default function ReportList({ reports } : { reports: any}) {

    const [clickedReports, setClickedReports] = useState<string[]>([]);
    const { unreadReportsCount, unreadReports } = useContext(NotificationContext)
    
    const handleClick = (reportName: string) => {
      if (!clickedReports.includes(reportName)) {
        setClickedReports([...clickedReports, reportName]);
      }
    };

    return (
      <div id="shadcn-tabs-component" className="">
        <Tabs defaultValue="unclaimed">
          <TabsList>
            <TabsTrigger value="unclaimed" className="relative">
              Unclaimed
              {unreadReports.some(report => report.report_stage === 'unclaimed') && (
                <div className="w-2 h-2 bg-status-notification rounded-full absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2"></div>
              )}
            </TabsTrigger>
            <TabsTrigger value="progress" className="relative">
              Progress
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="unclaimed">
            {/* <MockReportsBrief /> */}
            {reports?.unclaimed.length === 0 ? ('There are no reports that are ready to be claimed.') : reports?.unclaimed.map((report : ReportSummaryType) => (
                <ReportSummary clickedReports={clickedReports} 
                onClick={handleClick} key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="progress">
            {reports?.claimed.length === 0 ? ('There are no reports that have been claimed.') : reports?.claimed.map((report : ReportSummaryType) => (
                <ReportSummary clickedReports={clickedReports} 
                onClick={handleClick} key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="closed">
          {reports?.closed.length === 0 ? ('There are no reports that have been closed.') : reports?.closed.map((report : ReportSummaryType) => (
                <ReportSummary clickedReports={clickedReports} 
                onClick={handleClick} key={report.id} report={report} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
