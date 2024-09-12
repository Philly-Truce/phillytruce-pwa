import ReportForm from "@/components/create-report/report-form";

export default function CreateReport() {
  const emptyReport = {
    incident_report_number: 0,
    report_origin: "",
    report_initiated_at: new Date(),
    report_stage: "",
    incident_type: [],
    description: "",
    location: "",
    report_last_updated_at: new Date(),
    ppd_notified: false,
    date: "",
    time: "",
  };

  return (
    <div className="w-full">
      <ReportForm report={emptyReport} />
    </div>
  );
}
