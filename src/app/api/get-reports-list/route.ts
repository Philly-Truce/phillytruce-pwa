import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

type ReportSummary = {
  id: string;
  incident_report_number: number;
  report_initiated_at: Date;
  report_stage: string;
};

export async function GET(request: NextRequest) {
  const reports: ReportSummary[] = await prisma.report.findMany({
    select: {
      report_stage: true,
      incident_report_number: true,
      id: true,
      report_initiated_at: true,
    },
  });

  const unclaimed = reports.filter(
    (report) => report.report_stage === "unclaimed"
  );
  const claimed = reports.filter((report) => report.report_stage === "claimed");
  const closed = reports.filter(
    (report) =>
      report.report_stage === "closed" || report.report_stage === "archived"
  );

  const lists = {
    unclaimed,
    claimed,
    closed,
  };

  return NextResponse.json(lists, {
    status: 200,
  });
}
