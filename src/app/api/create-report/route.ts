import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract data from the request body
    const {
      incidentType,
      location,
      date,
      time,
      description,
      ppdNotified,
      creatorUserId,
    } = body;

    // Create a new report
    const newReport = await prisma.report.create({
      data: {
        incident_report_number: generateReportNumber(), // You need to implement this function
        report_origin: "user_created",
        report_stage: "claimed",
        incident_type: incidentType,
        description,
        location,
        report_last_updated_at: new Date(),
        ppd_notified: ppdNotified,
        creator_user_id: creatorUserId,
        report_initiated_at: new Date(`${date}T${time}`),
      },
    });

    return NextResponse.json(
      { message: "Report created successfully", report: newReport },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to generate a unique report number
function generateReportNumber(): string {
  // Implement your logic to generate a unique report number
  // For example, you could use a combination of date and random numbers
  const date = new Date();
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `REP-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${randomPart}`;
}
