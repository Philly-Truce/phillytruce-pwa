import NewReportForm from "@/components/createReport/NewReportForm";

const report = {
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
      <NewReportForm report={report} />
    </div>
  );
}
