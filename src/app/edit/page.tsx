import ReportForm from "@/components/create-report/report-form";

const report = {
  incident_report_number:5009,
  report_origin:"user_created",
  report_initiated_at:new Date("2024-08-12T21:30:00.000+00:00"),
  report_stage: "claimed",
  incident_type:['Fight','Bullying'],
  description:"Witnessed a theft and vandalism incident at the corner store.",
  location:"123 Main St, Philadelphia, PA 19019",
  report_last_updated_at:new Date("2024-08-12T22:29:56.203+00:00"),
  ppd_notified:true
};

export default function EditReport() {
  return (
    <div>
      <ReportForm report={report} />
    </div>
  );
}
