import ReportForm from "@/components/create-report/report-form";
import { fetchReportByReportNumber } from "../reports/[incident_report_number]/page";

const initialReport = {
  incident_report_number: 0,
  report_origin: "",
  report_initiated_at: new Date(),
  report_stage: "",
  incident_type: [],
  description: "",
  location: "",
  report_last_updated_at: new Date(),
  ppd_notified: false
};

export default async function EditReport({ searchParams } : { searchParams: { incident_report_number: string }}) {

  const report = await fetchReportByReportNumber(searchParams?.incident_report_number) || initialReport;

  return (
    <div className="w-full">
      <ReportForm report={report} />
    </div>
  );
}
