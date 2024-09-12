import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const incidentReportNumber = url.searchParams.get("incident_report_number");

    if (!incidentReportNumber || isNaN(Number(incidentReportNumber))) {
      return NextResponse.json(
        { error: "Invalid or missing incident report number" },
        { status: 400 }
      );
    }

    const foundReport = await prisma.report.findUnique({
      where: {
        incident_report_number: Number(incidentReportNumber),
      },
      include: {
        creator_user: {
          select: {
            phone: true,
          },
        },
      },
    });

    if (!foundReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(foundReport, { status: 200 });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
