import { useState, useCallback, FC } from "react";
import reportList from "@/app/reports/reportList.json";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";

interface Report {
  reportName: string;
  reportDate: string;
}

const reports: Report[] = reportList;

const Reports: FC = () => {
  const [clickedReports, setClickedReports] = useState<string[]>([]);

  const handleClick = useCallback(
    (reportName: string) => {
      if (!clickedReports.includes(reportName)) {
        setClickedReports([...clickedReports, reportName]);
      }
    },
    [clickedReports]
  );

  return (
    <div>
      <div>
        {reports.map(({ reportName, reportDate }) => (
          <div
            key={reportName}
            className="border-b border-gray-200 py-4 cursor-pointer flex justify-between"
            onClick={() => handleClick(reportName)}
          >
            <div>
              <h2
                className={`text-md ${
                  clickedReports.includes(reportName)
                    ? "font-normal"
                    : "font-bold"
                }`}
              >
                {reportName}
              </h2>
              <p className="text-sm">{reportDate}</p>
            </div>
            <Link href="">
              <button className="flex gap-5 items-center">
                <p className="font-bold text-sm">New Message</p>
                <SlArrowRight />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
