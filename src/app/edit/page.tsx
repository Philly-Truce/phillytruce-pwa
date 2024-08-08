import ReportForm from "@/components/create-report/ReportForm";

const report = {
  id: "1805",
  statusType: "unclaimed",
  submittedType: "Text In",
  incidentType: ["Fight", "Bullying"],
  location: "xxx",
  date: "08/05/24",
  time: "10:00 AM",
  description: "This is an event description.",
  ppdNotified: true,
};

export default function EditReport() {
  return (
    <div>
      <ReportForm report={report} />
    </div>
  );
}