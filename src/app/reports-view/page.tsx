import React from 'react'
import axios from 'axios'
import ReportView from '@/components/report-view'
import reports from '@/data/reports.json'
import type { Report } from '@/components/report-view'

/**
 *
 * @param id the report id
 * @returns
 */
const fetchReportById = async (id: number): Promise<Report> => {
    if (process.env.NODE_ENV === 'development') {
        const foundReport = reports.find(report => report.id === id);
        if (!foundReport) {
            throw new Error(`Report with id ${id} not found`);
        }

        return {
            ...foundReport,
            date: new Date(foundReport.date),
            connectedReports: []
        };
    }

    const res = await axios.get(`/api/reports/${id}`);
    return res.data;
};

/**
 *
 * @param params - id of the report
 * @returns Report view
 */
export default async function ReportsViewPage() {
    let id : number = 1805
    const report = await fetchReportById(id) ;

    return (
         <div className='pt-6 px-4'>
            <ReportView report={report} />
        </div>
    )
}
