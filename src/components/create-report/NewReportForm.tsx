"use client";

import OverviewField from "./OverviewField";
import DetailField from "./DetailField";
import ConnectedReportsField from "./ConnectedReportsField";

export default function NewReportForm() {
  return (
    <div>
      <form className="py-2">
        <h4 className="text-primary font-bold py-2 text-md">Overview</h4>
        <OverviewField />

        <h4 className="text-primary font-bold text-md py-2">Details</h4>
        <DetailField />

        <div className="pt-6 pb-4 px-3 flex flex-row justify-start">
          <input
            type="checkbox"
            name="PPD Notified"
            className="w-5 h-5 border-1 border-primary "
          />
          <label htmlFor="PPD Notified" className="pl-8">
            PPD Notified
          </label>
        </div>
        <h4 className="text-primary font-bold text-md py-2">
          Connected Reports
        </h4>
        <ConnectedReportsField/>
      </form>
    </div>
  );
}
