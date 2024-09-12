"use client"
import { Report } from "@/components/report-view";
import { TwilioContext } from "@/lib/twilio-provider";
import axios from "axios";
import React, { useContext, useEffect } from "react";

type NotificationContextType = {
    unreadReportsCount: number,
    unreadReports: any[]
}

//TODO: remove this current user context once auth is completed and a real user id can be passed to the notification provider
export const FauxCurrentUser = React.createContext({ user_id: '66ba6bfd81833a6900354b86' })

export const NotificationContext = React.createContext<NotificationContextType>(
    { 
        unreadReportsCount: 0, 
        unreadReports: []
    }
)

export const NotificationProvider = ({ children } : { children: React.ReactNode }) => {
    const [ unreadReportsCount, setUnreadReportsCount ] = React.useState<number>(0)
    const [ unreadReports, setUnreadReports ] = React.useState<string[]>([])
    const { user_id } = useContext(FauxCurrentUser);

    
    useEffect(() => {
        const fetchUnreadReports = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-reports-list`);
            const reports = await response.data;

            // filter through unclaimed reports that have not been read by the current user
            const unreadUnclaimedReports = reports.unclaimed.filter((r: Report) => !r?.read_by?.includes(user_id)); // Filter unclaimed reports where user_id is not in read_by

            //TODO: get the count and ids for in-progress/claimed reports that have unread messages then get total sum from both lengths
            
            setUnreadReports(unreadUnclaimedReports); // Assuming each report has an id
            setUnreadReportsCount(unreadReports.length);

        };

        fetchUnreadReports();

    }, [unreadReportsCount, unreadReports.length, user_id]);

    return (
        <NotificationContext.Provider value={{ unreadReportsCount, unreadReports }}>
            {children}
        </NotificationContext.Provider>
    );
}