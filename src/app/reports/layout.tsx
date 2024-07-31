import React from 'react'
/**
 * layout for the reports view
 * 
 * @param children
 * @returns 
 */
export default function ReportsViewLayout({ children } : { children : React.ReactNode }) {

    return (
        <div className='p-8 min-h-screen flex flex-col gap-4'>
            {children}
        </div>
    )

}