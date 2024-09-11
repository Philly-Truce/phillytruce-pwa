import React from "react";
import Image from "next/image";
export const ConnectedReportSummary = ({ id }) => (<div className="flex flex-row gap-x-2 bg-level-2">
        <div className="w-12 h-12 flex items-center justify-center">
            <Image src='/icons/report.svg' alt="" width={24} height={24}/>
        </div>
        <div>
            <p>{id}</p>
            <button className="h-full">
                <Image src='/icons/arrow_right_24px.svg' alt="" width={24} height={24}/>
            </button>
        </div>

    </div>);
