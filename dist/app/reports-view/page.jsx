var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import ReportView from "@/components/report-view";
import reports from "@/data/reports.json";
/**
 * Fetches the
 * @param id the report id
 * @returns report details
 */
const fetchReportByReportNumber = (incidentReportNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const foundReport = reports.find((report) => report.incident_report_number === incidentReportNumber);
    if (!foundReport) {
        // Redirect to 404 page
        throw new Response("Not Found", { status: 404 });
    }
    return Object.assign(Object.assign({}, foundReport), { date: new Date(foundReport.date), connectedReports: [] });
});
/**
 *
 * @param params - id of the report
 * @returns Report view
 */
export default function ReportsViewPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const report = yield fetchReportByReportNumber(1805);
        return (<div id="reports-view-page" className="pt-[88px] px-4 w-full">
      <ReportView report={report}/>
    </div>);
    });
}
