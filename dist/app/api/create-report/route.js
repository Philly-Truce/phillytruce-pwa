var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield request.json();
            // Extract data from the request body
            const { incidentType, location, date, time, description, ppdNotified } = body;
            // Generate a unique report number
            const reportNumber = yield generateUniqueReportNumber();
            // Create a new user-created report
            const newReport = yield prisma.report.create({
                data: {
                    incident_report_number: reportNumber,
                    report_origin: "user_created",
                    report_stage: "claimed",
                    incident_type: incidentType,
                    description,
                    location,
                    report_last_updated_at: new Date(),
                    ppd_notified: ppdNotified,
                    creator_user_id: "66ba6bfd81833a6900354b86",
                    report_initiated_at: new Date(`${date}T${time}`),
                },
            });
            return NextResponse.json({ message: "Report created successfully", report: newReport }, { status: 201 });
        }
        catch (error) {
            console.error("Error creating report:", error);
            return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function generateUniqueReportNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        let isUnique = false;
        let reportNumber = Math.floor(1000 + Math.random() * 9000);
        while (!isUnique) {
            try {
                // Try to find a report with this number
                yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const existingReport = yield tx.report.findUnique({
                        where: { incident_report_number: reportNumber },
                    });
                    if (existingReport) {
                        throw new Error("Report number already exists");
                    }
                    // If we reach here, the report number is unique
                    isUnique = true;
                }));
            }
            catch (error) {
                // If there's an error, it means the number already exists, so we'll try again
                console.log(`Report number ${reportNumber} already exists, generating a new one.`);
                reportNumber = Math.floor(1000 + Math.random() * 9000); // Generate a new random number
            }
        }
        return reportNumber;
    });
}
