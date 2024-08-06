"use client";

import OverviewField from "./OverviewField";
import DetailField from "./DetailField";
import ConnectedReportsField from "./ConnectedReportsField";
import Continue from "./Continue";

interface ReportData {
  incidentType: string[];
  location: string;
  date: string;
  time: string;
  description: string;
  ppdNotified: boolean;
}

interface Report {
  report?: ReportData;
}

const NewReportForm: React.FC<Report> = ({ report }) => {
  return (
    <div>
      <p className="text-sm py-2">
        Please provide detailed information of the incident in this form
      </p>
      <hr />
      <form className="py-2">
        <h4 className="text-primary font-bold py-2 text-md">Overview</h4>
        {report ? (
          <OverviewField incidentType={report.incidentType} />
        ) : (
          <OverviewField />
        )}

        <h4 className="text-primary font-bold text-md py-2">Details</h4>
        {report ? (
          <DetailField
            location={report.location}
            date={report.date}
            time={report.time}
            descriptionData={report.description}
          />
        ) : (
          <DetailField />
        )}

        <div className="pt-6 pb-4 px-3 flex flex-row justify-start">
          <input
            type="checkbox"
            name="PPD Notified"
            className="w-5 h-5 border-1 border-primary "
            defaultChecked={report?.ppdNotified ? report.ppdNotified : false}
          />
          <label htmlFor="PPD Notified" className="pl-8">
            PPD Notified
          </label>
        </div>
        {/* <h4 className="text-primary font-bold text-md py-2">
          Connected Reports
        </h4>
        <ConnectedReportsField/> */}
        <div className="flex flex-col gap-2 py-4 sticky">
          {report ? (
            <button className="bg-primary rounded-xl text-white text-sm py-2">
              SAVE
            </button>
          ) : (
            <button className="bg-gray-100 rounded-xl text-primary text-sm py-2" disabled>SAVE</button>
          )}
          <button className="rounded-xl text-primary text-sm py-2 p-1 border border-black">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReportForm;
