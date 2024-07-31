import { InputField } from '@/components/inputs'
import React from 'react'

export default function ReportsViewPage() {

    return (
        <>
            <form>
                <div>
                    <InputField 
                    name="name" 
                    placeholder="Name" 
                    label="Name" 
                    type="text" 
                    readOnly={true} 
                    disabled={true} />
                </div>
            </form>
        </>
    )
}