import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {

  try {
    const url = new URL(request.url);
    const incidentReportNumber = url.searchParams.get("incident_report_number");

    const foundReport = await prisma.report.findUnique({
      where: { 
        incident_report_number: Number(incidentReportNumber) 
      }, 
      include: {
        creator_user: {
          select: {
            first_name: true
          }
        }
      }
    });

    if (!foundReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      { foundReport },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }

}