import React from "react";
import { InputField, TextAreaField } from "@/components/reports-view/inputs";
import dayjs from "dayjs";
import Confirmation from "../../app/confirmation/page";
import Link from "next/link";

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

  return (
    <form className="relative w-full max-h-full flex flex-col justify-between gap-y-4 my-6">
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
          <h3 className="font-semibold text-base text-primary mb-2">Details</h3>
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
      <Link href="/confirmation">
        <button className="uppercase border-accent rounded-2xl px-6 py-2 shadow-2xl w-full text-center bg-primary text-white">
          Claim Report
        </button>
      </Link>
      {/* {statusType !== "closed" && <Confirmation statusType={statusType} />} */}
    </form>
  );
}
