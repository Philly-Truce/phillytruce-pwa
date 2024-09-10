import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract data from the request body
    const { incident_type, location, date, time, description, ppd_notified } =
      body;

    // Generate a unique report number
    const reportNumber = await generateUniqueReportNumber();

    // Create a new user-created report
    const newReport = await prisma.report.create({
      data: {
        incident_report_number: reportNumber,
        report_origin: "user_created",
        report_stage: "claimed",
        incident_type,
        description,
        location,
        report_last_updated_at: new Date(),
        ppd_notified,
        creator_user_id: "66ba6bfd81833a6900354b86",
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

async function generateUniqueReportNumber(): Promise<number> {
  let isUnique = false;
  let reportNumber = Math.floor(1000 + Math.random() * 9000);

  while (!isUnique) {
    try {
      // Try to find a report with this number
      await prisma.$transaction(async (tx) => {
        const existingReport = await tx.report.findUnique({
          where: { incident_report_number: reportNumber },
        });

        if (existingReport) {
          throw new Error("Report number already exists");
        }

        // If we reach here, the report number is unique
        isUnique = true;
      });
    } catch (error) {
      // If there's an error, it means the number already exists, so we'll try again
      console.log(
        `Report number ${reportNumber} already exists, generating a new one.`
      );
      reportNumber = Math.floor(1000 + Math.random() * 9000); // Generate a new random number
    }
  }

  return reportNumber;
}
