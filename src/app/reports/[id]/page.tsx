import { InputField, TextAreaField } from '@/components/inputs'
import React from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import ReportView from '@/components/ReportView'
import reports from '@/data/reports.json'
import { Report } from '@/components/ReportView'

/**
 * 
 * @param id the report id
 * @returns 
 */
const fetchReportById = async (id: string): Promise<Report> => {
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

export default async function ReportsViewPage(
    { params } : { params: { id: string } }
) {
    const report = await fetchReportById(params.id);
    
    return (
        <div className='pt-6'>
            <ReportView report={report} />
        </div>
    )
}