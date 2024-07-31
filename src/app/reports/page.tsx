import { InputField } from '@/components/inputs'
import React from 'react'
import unclaimedIcon from '@/public/icons/warning_amber.svg'
import axios from 'axios'

export type Claim = {
    id: string,
    statusType: string,
    submittedType: string,
    incidentType: string,
    location: string,
    date: Date,
    details: string,
    connectedReports: Claim[]
}

const mockData : Claim = {
    id: '123r391u832u18djkfajd',
    statusType: 'Unclaimed',
    submittedType: 'SPM Alyssa', 
    incidentType: 'Fight',
    location: '123 Main St',
    date: new Date(),
    details: 'The incident involved two individuals, identified as John Doe and Jane Smith, both residents of the neighborhood. According to multiple eyewitness accounts, the altercation began as a verbal dispute, which quickly escalated into a physical confrontation. John Doe was observed shoving Jane Smith, who retaliated by striking Doe in the face. Bystanders attempted to intervene and separate the individuals. Both parties sustained minor injuries: Doe had a bleeding nose and Smith a bruise on her left arm. SPM arrived on the scene at 3:50 PM, diffused the situation, and provided first aid to the injured parties.',
    connectedReports: [
        {
            id:'5i191o040404',
            statusType: 'Unclaimed',
            submittedType: 'SPM Alyssa',
            incidentType: 'Fight',
            location: '123 Main St',
            date: new Date(),
            details: 'The incident involved two individuals, identified as John Doe and Jane Smith, both residents of the neighborhood. According to multiple eyewitness accounts, the altercation began as a verbal dispute, which quickly escalated into a physical confrontation. John Doe was observed shoving Jane Smith, who retaliated by striking Doe in the face. Bystanders attempted to intervene and separate the individuals. Both parties sustained minor injuries: Doe had a bleeding nose and Smith a bruise on her left arm. SPM arrived on the scene at 3:50 PM, diffused the situation, and provided first aid to the injured parties.',
            connectedReports: []
        },
        {
            id:'519592djfdj9052ijfdljaif',
            statusType: 'Unclaimed',
            submittedType: 'SPM Alyssa',
            incidentType: 'Fight',
            location: '123 Main St',
            date: new Date(),
            details: 'The incident involved two individuals, identified as',
            connectedReports: []
        }
    ]
}

const fetchClaimById = async (id : string) : Promise<Claim> => {
    if(process.env.NODE_ENV === 'development') {
        return mockData;
    }

    const res = await axios.get(`${process.env.BACKEND_URL}/api/claims/${id}`);
    const data = await res.data;
    return data;
};

export default async function ReportsViewPage() {

    const { statusType, 
        submittedType, 
        incidentType, 
        location, 
        date, 
        details, 
        connectedReports
    }
     : Claim = await fetchClaimById('123r3enc91u832u18djkfajd')

    return (
        <>
            <form>
                <div className='overview'>
                    <h3 className='font-semibold'>Overview</h3>
                    <div className='space-x-4'>
                        <InputField 
                        name="status-type" 
                        placeholder="" 
                        icon={unclaimedIcon}
                        label="Status Type" 
                        type="text" 
                        value={statusType}
                        readOnly={true} 
                        disabled={true}
                        width="1/2" />
                        
                    </div>
                </div>
            </form>
        </>
    )
}