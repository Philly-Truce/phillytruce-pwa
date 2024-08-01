import { InputField, TextAreaField } from '@/components/inputs'
import React from 'react'
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

export default async function ReportView({ report } : { report: Report }) {
    const { 
        statusType, 
        submittedType, 
        incidentType, 
        location, 
        date, 
        details, 
        connectedReports
    } : Report = report;

    return (
        <>
            <form className='relative w-full flex flex-col gap-y-4 min-h-full'>
                {/* Overview: Status, Submitted By, Incident Type */}
                <div className='overview w-full'>
                    <h3 className='font-semibold text-base text-primary mb-2'>
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
                            icon="/icons/textsms.svg"
                            disabled={true}
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
                    <h3 className='font-semibold text-base text-primary mb-2'>Details</h3>
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
                        disabled={statusType === 'in progress' ? false : true}
                        />
                    </div>
                </div>
                <div className='fixed p-8 left-0 bottom-0 w-full flex flex-col items-center justify-center'>
                    <button className={`${statusType === 'unclaimed' ? 'bg-primary text-white' : 'bg-white text' } uppercase border-accent rounded-2xl px-6 py-2
                     shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_0px_rgba(0,0,0,0.30)] w-full text-center`}>
                        {statusType === 'unclaimed' ? 'Claim Report' : 'Close Report'}
                    </button>
                </div>
            </form>
        </>
    )
}