import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface SelectedReport {
  id: string;
  incident_report_number: number;
  report_initiated_at: Date;
  report_stage: string | null;
}

export async function GET(request: NextRequest) {
  const reports = await prisma.report.findMany({
    select: {
      report_stage: true,
      incident_report_number: true,
      id: true,
      report_initiated_at: true,
    },
  });

  const unclaimed = reports.filter(
    (report: SelectedReport) => report.report_stage === "unclaimed"
  );
  const claimed = reports.filter(
    (report: SelectedReport) => report.report_stage === "claimed"
  );
  const closed = reports.filter(
    (report: SelectedReport) =>
      report.report_stage === "closed" || report.report_stage === "archived"
  );

  const lists = {
    unclaimed: unclaimed,
    claimed: claimed,
    closed: closed,
  };

  return NextResponse.json(lists, {
    status: 200,
  });
}
