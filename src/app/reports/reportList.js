"use client";
import React, { useState } from "react";

const jsonData = [
  {
    reportName: "Report #1805",
    reportDate: "08/17/23",
  },
  {
    reportName: "Report #1851",
    reportDate: "08/15/23",
  },
  {
    reportName: "Report #1839",
    reportDate: "08/10/23",
  },
  {
    reportName: "Report #1843",
    reportDate: "08/10/23",
  },
  {
    reportName: "Report #1845",
    reportDate: "08/10/23",
  },
];

const ReportList = () => {
  const [clickedReports, setClickedReports] = useState([]);

  const handleClick = (reportName) => {
    if (!clickedReports.includes(reportName)) {
      setClickedReports([...clickedReports, reportName]);
    }
  };

  return (
    <div>
      {jsonData.map((report, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4 "
          onClick={() => handleClick(report.reportName)}
          style={{
            fontWeight: clickedReports.includes(report.reportName)
              ? "normal"
              : "bold",
          }}
        >
          <h2 className="text-md">{report.reportName}</h2>
          <p className="text-sm">{report.reportDate}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
