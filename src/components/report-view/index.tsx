import React from "react";
import { InputField, TextAreaField } from "@/components/report-view/inputs";
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
  id: number;
  statusType: string;
  submittedType: string;
  incidentType: string;
  location: string;
  date: Date;
  details: string;
  connectedReports: string[];
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
    "in progress": {
      dialogTitle: "Would you like to close this report?",
      dialogDescription:
        "This report will be submitted for view and marked as closed.",
      ctaButtonText: "Close Report",
      buttonTWClasses: "bg-secondary text-black",
    },
    closed: {
      dialogTitle: "",
      dialogDescription: "",
      ctaButtonText: "",
      buttonTWClasses: "bg-primary text-white",
    },
  };

  return statusConfigurations[statusType] || null;
};

/**
 * A read only view of a report
 * @param report - Report object
 * @returns
 */

export default async function ReportView({ report }: { report: Report }) {
  const {
    statusType,
    submittedType,
    incidentType,
    location,
    date,
    details,
  }: Report = report;

  const { dialogTitle, dialogDescription, ctaButtonText, buttonTWClasses } =
    reportStatusState(statusType) || {};

  const buttonBaseClasses =
    "uppercase border-accent rounded-2xl px-6 py-2 shadow-2xl w-full text-center";

  return (
    <>
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
                  name="status-type"
                  placeholder=""
                  icon={
                    submittedType === "text-in"
                      ? "/icons/textsms.svg"
                      : "/icons/SPM_shield.svg"
                  }
                  label="Status Type"
                  defaultValue={statusType}
                  readOnly={true}
                  width="1/2"
                />
                <InputField
                  name="submitted-type"
                  placeholder=""
                  label="Submitted Type"
                  defaultValue={submittedType}
                  icon="/icons/textsms.svg"
                  readOnly={true}
                  width="1/2"
                />
              </div>
              <InputField
                name="incident-type"
                placeholder=""
                label="Incident Type"
                defaultValue={incidentType}
                readOnly={true}
                status={statusType}
                icon="/icons/flag.svg"
              />
            </div>
          </div>
          {/* Incident Details: Location, Date, Time, Details */}
          <div className="incident-details w-full mt-4">
            <h3 className="font-semibold text-base text-primary mb-2">
              Details
            </h3>
            <div className="w-full gap-y-4 flex flex-col">
              <InputField
                name="location"
                placeholder=""
                label="Location"
                defaultValue={location}
                readOnly={true}
                width="full"
                icon="/icons/location.svg"
              />
              <div className="flex flex-row w-full gap-x-2">
                <InputField
                  name="date"
                  placeholder=""
                  label="Date"
                  icon="/icons/calendar.svg"
                  defaultValue={dayjs(date).format("MM/DD/YYYY")}
                  width="1/2"
                />
                <InputField
                  name="time"
                  placeholder=""
                  label="Time"
                  icon="/icons/clock.svg"
                  defaultValue={dayjs(date).format("hh:mm A")}
                  width="1/2"
                />
              </div>
              <TextAreaField
                name="details"
                placeholder=""
                label="Details"
                defaultValue={details}
                icon="/icons/description.svg"
                readOnly={true}
                status={statusType}
                maxRows={3}
              />
            </div>
          </div>
        </div>

        {statusType !== "closed" && (
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
                        <button className="text-primary font-medium">Yes</button>
                      </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </form>
    </>
  );
}
