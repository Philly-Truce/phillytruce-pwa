import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function ReportsNavigationPage() {
    
    return (
        <div className="flex flex-row gap-4">
            <Link href="/reports" className="flex flex-row gap-2">
                <Image width={24} height={24} src="/icons/report.svg" alt="" />
                <p>Reports</p>
            </Link>
            <Link href="/reports/new" className="flex flex-row gap-2">
                <Image width={24} height={24} src="/icons/add.svg" alt="" />
                <p>New Report</p>
            </Link>
        </div>
    )
}