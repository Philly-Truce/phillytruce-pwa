"use client";
import React, { useContext, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn-ui/tabs";
import { ReportSummary } from "./ReportSummary";
import { NotificationContext } from "@/lib/notification-provider";

export type ReportSummaryType = {
  id: string;
  report_stage: string;
  report_initiated_at: Date;
  incident_report_number: number;
};

export default function ReportList({
  reports,
}: {
  reports: ReportSummaryType[];
}) {
  console.log("Reports received in ReportList:", reports);
  const { unreadReports } = useContext(NotificationContext);
  const [clickedReports, setClickedReports] = useState<string[]>([]);

  const handleClick = (reportId: string) => {
    if (!clickedReports.includes(reportId)) {
      setClickedReports([...clickedReports, reportId]);
    }
  };

  const unclaimed = reports.filter(
    (report) => report.report_stage === "unclaimed"
  );
  const claimed = reports.filter((report) => report.report_stage === "claimed");
  const closed = reports.filter(
    (report) =>
      report.report_stage === "closed" || report.report_stage === "archived"
  );

  return (
    <div id="shadcn-tabs-component" className="">
      <Tabs defaultValue="unclaimed">
        <TabsList>
          <TabsTrigger value="unclaimed" className="relative">
            Unclaimed ({unclaimed.length})
            {unreadReports.some(
              (report) => report.report_stage === "unclaimed"
            ) && (
              <div className="w-2 h-2 bg-status-notification rounded-full absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="progress" className="relative">
            In Progress ({claimed.length})
          </TabsTrigger>
          <TabsTrigger value="closed">Closed ({closed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="unclaimed">
          {unclaimed.length === 0 ? (
            <p>There are no reports that are ready to be claimed.</p>
          ) : (
            unclaimed.map((report) => (
              <ReportSummary
                key={report.id}
                report={report}
                onClick={handleClick}
                clickedReports={clickedReports}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="progress">
          {claimed.length === 0 ? (
            <p>There are no reports that have been claimed.</p>
          ) : (
            claimed.map((report) => (
              <ReportSummary
                key={report.id}
                report={report}
                onClick={handleClick}
                clickedReports={clickedReports}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="closed">
          {closed.length === 0 ? (
            <p>There are no reports that have been closed.</p>
          ) : (
            closed.map((report) => (
              <ReportSummary
                key={report.id}
                report={report}
                onClick={handleClick}
                clickedReports={clickedReports}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
