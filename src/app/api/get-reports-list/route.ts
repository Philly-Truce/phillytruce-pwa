import { Report } from "@/components/report-view";
import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    //get all the reports then sort them into separate arrays: unclaimed, claimed, and closed or archived
    const reports = await prisma.report.findMany({
        select: {
            report_stage: true,
            incident_report_number: true,
            id: true,
            report_initiated_at: true
        }
    })
    
    const unclaimed = reports.filter((report : Report) => report.report_stage === 'unclaimed');
    const claimed = reports.filter((report : Report) => report.report_stage === 'claimed');
    const closed = reports.filter((report : Report) => report.report_stage === 'closed' || report.report_stage === 'archived');

    const lists = {
        unclaimed: unclaimed,
        claimed: claimed,
        closed: closed
    }
    
    return NextResponse.json(lists, {
        status: 200
    })
}