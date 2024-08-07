import textIcon from "@/assets/create-form-image/textIcon.svg";
import dropdownIcon from "@/assets/create-form-image/dropdownIcon.svg";
import Image from "next/image";
import { useState, MouseEvent } from "react";

export default function ConnectedReportsField() {
  const [connectedReport, setConnectedReport] = useState<string[]>([]);
  const [showReport, setShowReport] = useState<boolean>(false);
  const reports = [
    "Report #9278",
    "Report #9279",
    "Report #9280",
    "Report #9281",
    "Report #9282",
    "Other",
  ];

  const handleReportChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    report: string
  ) => {
    if (e.target.checked) {
      setConnectedReport([...connectedReport, report]);
    } else {
      setConnectedReport(connectedReport.filter((option) => option !== report));
    }
  };
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowReport(!showReport);
  };
  return (
    <>
      <fieldset className="border p-1 rounded-md border-black">
        <legend className="text-sm px-2">Group with</legend>
        <button onClick={handleClick} className="w-full">
        <div className="relative flex flex-row">
            <Image src={textIcon} alt="Location Icon" />
            <input
              type="text"
              placeholder="Select any connected reports"
              className="block w-full appearance-none bg-white placeholder-wrap pb-4"
              value={connectedReport}
              readOnly
            />
            <Image src={dropdownIcon} alt="Icon" />
          </div>
        </button>
      </fieldset>

      {showReport ? (
        <div className="w-full flex flex-col bg-gray-100 px-8 py-4 gap-3 rounded-lg shadow-md">
          <small>Select all that apply</small>

          {reports.map((report, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="w-4 h-4"
                value={report}
                onChange={(e) => handleReportChange(e, report)}
              />
              <label className="pl-4">{report}</label>
            </div>
          ))}
        </div>
      ) : (
        <>
          {" "}
          <small className="px-4">If none,leave blank</small>
        </>
      )}
    </>
  );
}
