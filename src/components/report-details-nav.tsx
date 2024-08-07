import React from "react"
import { GoArrowLeft } from "react-icons/go"

type CurrentScreenNavProps = {
    title: string,
    children?: React.ReactNode
}

export const CurrentScreenNav = ({ title, children }: CurrentScreenNavProps) => {

    const handleBack = () => {
        // TODO:Implement back button functionality
    }

    return (
        <div className="flex flex-row bg-primary text-white h-14 justify-between items-center p-4 gap-4">
            <div className="flex flex-row space-x-4">
                <button>
                    <GoArrowLeft size={25} />
                </button>
                <h1 className="text-xl">{title}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}