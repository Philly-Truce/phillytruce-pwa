"use client"
import React from "react";
import { InputField, TextAreaField } from "@/components/report-view/inputs";
import type { ObjectId } from 'mongodb'
import dayjs from "dayjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/report-view/dialog";

export type Report = {
  id: string; 
  incident_report_number: number; 
  report_initiated_at: Date; 
  report_stage?: string; 
  report_origin: string;
  incident_type: string[];
  description: string; 
  location: string; 
  report_last_updated_at?: Date; 
  ppd_notified: boolean; 
  creator_user: any; 
  witness_id?: string | null;
  session_id?: string | null; 
  chat_service_id?: string | null; 
  last_message_at?: Date | null; 
  unclaimed_at?: Date | null; 
  claimed_at?: Date | null; 
  messages?: any; 
  archived_at?: Date | null; 
};

type StatusConfiguration = {
  dialogTitle: string;
  dialogDescription: string;
  ctaButtonText: string;
  buttonTWClasses: string;
};

const reportStatusState = (statusType: string): StatusConfiguration | null => {
  const statusConfigurations: { [key: string]: StatusConfiguration } = {
    unclaimed: {
      dialogTitle: "Would you like to claim this report?",
      dialogDescription:
        "Claiming this report will make it attached to you as a Safe Path Monitor and you will be responsible for resolving it.",
      ctaButtonText: "Claim Report",
      buttonTWClasses: "bg-primary text-white",
    },
    claimed: {
      dialogTitle: "Would you like to close this report?",
      dialogDescription:
        "This report will be submitted for view and marked as closed.",
      ctaButtonText: "Close Report",
      buttonTWClasses: "bg-white text-black border-2 border-border",
    },
    archive: {
      dialogTitle: "",
      dialogDescription: "",
      ctaButtonText: "",
      buttonTWClasses: "bg-secondary text-black",
    },
  };

  return statusConfigurations[statusType] || null;
};

/**
 * A read only view of a report allowing
 * All input fields for this form should be readOnly or disabled to ensure good ux
 * @param report - Report object
 * @returns
 */
const ReportView: React.FC<any> = ({ report, onStatusUpdate } : { report: Report, onStatusUpdate: () => void }) => {
  
  const reportStage = report?.report_stage || '';

  const { 
    dialogTitle, 
    dialogDescription, 
    ctaButtonText, 
    buttonTWClasses 
  } = reportStatusState(reportStage) || {};

  const buttonBaseClasses = "uppercase border-accent rounded-2xl px-6 py-2 shadow-2xl w-full text-center";
   
  /**
   * An object for the report stage label and icon
   * @returns JS object with key-values for label and icon 
   */  
  const reportStageLabelAndIcon = () => {
    
    switch(report?.report_stage) {
      case 'claimed':
        return {
          label: 'In Progress',
          icon:'/icons/in-progress.svg'
        }
      case 'archived':
        return {
        label: 'Closed',
        icon: '/icons/closed.svg'
      }
      default:
        return {
          label: 'Unclaimed',
          icon:'/icons/warning_amber.svg'
        }
    }
  }
  
  return (
    <form className="relative w-full flex flex-col justify-between gap-y-4 min-h-full">
      <div>
        {/* Overview: Status, Submitted By, Incident Type */}
        <div className="overview w-full">
          <h3 className="font-semibold text-base text-primary mb-2">
            Overview
          </h3>
          <div className="w-full gap-y-4 flex flex-col">
            <div className="flex flex-row w-full gap-x-2 justify-between">
              <InputField
                name="report-stage"
                placeholder=""
                label="Report Stage"
                defaultValue={reportStageLabelAndIcon().label}
                readOnly={true}
                width="1/2"
                icon={reportStageLabelAndIcon().icon}
              />
              <InputField
                name="report-origin"
                placeholder=""
                label="Report Origin"
                defaultValue={report?.report_origin === "witness_text" ? "Text-In" : ("SPM " + report?.creator_user.first_name)}
                readOnly={true}
                width="1/2"
                icon={
                  report?.report_origin === "witness_text"
                    ? "/icons/textsms.svg"
                    : "/icons/SPM_shield.svg"
                }
              />
            </div>
            <InputField
                name="Incident Type"
                placeholder=""
                label="Incident Type"
                defaultValue={report?.incident_type.join(', ')}
                readOnly={true}
                width="1/2"
                icon="/icons/flag.svg"
              />
          </div>
        </div>
        {/* Incident Details: Location, Date, Time, Details */}
        <div className="incident-details w-full mt-4">
          <h3 className="font-semibold text-base text-primary mb-2">Details</h3>
          <div className="w-full gap-y-4 flex flex-col">
            {/* Location Field */}
            <InputField
              name="location"
              placeholder=""
              label="Location"
              defaultValue={report?.location}
              readOnly={true}
              width="full"
              icon="/icons/location.svg"
            />
            {/* Date and Time Fields*/}
            <div className="flex flex-row w-full gap-x-2">
              <InputField
                name="date"
                placeholder=""
                label="Date"
                icon="/icons/calendar.svg"
                defaultValue={dayjs(report?.report_initiated_at).format("MM/DD/YYYY")}
                width="1/2"
              />
              <InputField
                name="time"
                placeholder=""
                label="Time"
                icon="/icons/clock.svg"
                defaultValue={dayjs(report?.report_initiated_at).format("hh:mm A")}
                width="1/2"
              />
            </div>
            {/* Incident details field */}
            <TextAreaField
              name="description"
              placeholder=""
              label="Description"
              defaultValue={report?.description}
              icon="/icons/description.svg"
              readOnly={true}
              maxRows={3}
            />
          </div>
        </div>
      </div>
      {report?.report_stage !== "closed" && (
        <div className="py-8 relative left-0 bottom-0 flex w-full flex-col items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button className={`${buttonTWClasses} ${buttonBaseClasses}`}>
                {ctaButtonText}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>{dialogDescription}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex flex-row justify-end h-14 px-6">
                  <div className="flex flex-row gap-x-4 h-full">
                    <DialogClose asChild>
                      <button className="text-primary font-medium">No</button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button onClick={onStatusUpdate} className="text-primary font-medium">
                        Yes
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </form>
  );
}

export default ReportView