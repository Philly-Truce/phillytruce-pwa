import { NextRequest } from "next/server";
import prisma from "@/db/prisma";

// Updates the status. Is unidirectional 
export async function POST(request: NextRequest) {
    const body: any = await request.json();
    const { incident_report_number, report_stage } = body;

    const nextStage = () => {
        switch(report_stage) {
            case 'data-gathering':
                return 'unclaimed';
            case 'unclaimed':
                return 'claimed';
            case 'claimed':
                return 'archived';
            default:
                return report_stage; // No change if the stage is not recognized
        }
    }

    /*
        If a report was texted in, incident type will be left blank 
        until the SPM that claimed the report is able to identify what type of incident it is. 
    */

    try {
        // Update current report to have the next report stage
        const updatedReport = await prisma.report.update({ 
            where: { incident_report_number: incident_report_number },
            data: { 
                report_stage: nextStage(),
            }
        });

        return new Response(JSON.stringify(updatedReport), { status: 200 });
    } catch (error) {
        console.error("Error updating report status:", error);
        return new Response(JSON.stringify({ error: "Failed to update report status" }), { status: 500 });
    }
}