import { InputField, TextAreaField } from '@/components/inputs'
import React from 'react'
import reports from '@/data/reports.json'
import dayjs from 'dayjs'

import axios from 'axios'

export type Report = {
    id: string,
    statusType: string,
    submittedType: string,
    incidentType: string,
    location: string,
    date: Date,
    details: string,
    connectedReports: Report[]
}

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

    const res = await axios.get(`http://localhost:8080/api/reports/${id}`);
    return res.data;
};

export default async function ReportsViewPage(
    { params } : { params: { id: string } }
) {

    const { 
        statusType, 
        submittedType, 
        incidentType, 
        location, 
        date, 
        details, 
        connectedReports
    } : Report = await fetchReportById(params.id);

    return (
        <>
            <form>
                {/* Overview: Status, Submitted By, Incident Type */}
                <div className='overview w-full'>
                    <h3 className='font-semibold text-base text-primary'>
                        Overview
                    </h3>
                    <div className='w-full gap-y-4 flex flex-col'>
                        <div className='flex flex-row w-full gap-x-2 justify-between'>
                            <InputField 
                            name="status-type" 
                            placeholder="" 
                            icon="/icons/warning_amber.svg"
                            label="Status Type" 
                            value={statusType}
                            readOnly={true} 
                            width='1/2'
                             />
                            <InputField name='submitted-type' 
                            placeholder='' 
                            label='Submitted Type' 
                            value={submittedType} 
                            icon="/icons/SPM_shield.svg"
                            readOnly={true} 
                            width="1/2" />
                        </div>
                        <InputField name='incident-type'
                        placeholder=''
                        label='Incident Type'
                        value={incidentType}
                        readOnly={true}
                        icon='/icons/flag.svg' />
                    </div>
                </div>
                {/* Incident Details: Location, Date-Time, Details */}
                <div className='incident-details w-full'>
                    <h3 className='font-semibold text-base text-primary'>Details</h3>
                    <div className='w-full gap-y-4 flex flex-col'>
                        <InputField name='location'
                            placeholder=''
                            label='Location'
                            value={location}
                            readOnly={true}
                            width='full'
                            icon='/icons/location.svg' />
                        <div className='flex flex-row w-full gap-x-2'>
                            <InputField name='date' 
                            placeholder=''
                            label='Date'
                            icon='/icons/calendar.svg'
                            value={dayjs(date).format('MM/DD/YYYY')}
                            width='1/2'
                            />
                            <InputField name='time'
                            placeholder=''
                            label='Time'
                            icon='/icons/clock.svg'
                            value={dayjs(date).format('hh:mm A')} 
                            width='1/2' />
                        </div>
                        <TextAreaField name='details' 
                        placeholder=''
                        label='Details'
                        value={details}
                        icon='/icons/description.svg'
                        readOnly={true}
                        disabled={statusType === 'in-progress' ? false : true}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}