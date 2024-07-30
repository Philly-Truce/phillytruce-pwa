import NewReportForm from "@/components/createReport/NewReportForm";
import { GoArrowLeft } from "react-icons/go";

export default function createReport() {
  return (
    <div>
      <div className="flex flex-row bg-primary text-white h-[64px] justify-start items-center p-[16px] gap-4">
        <GoArrowLeft />
        <h1>Create New Report</h1>
      </div>
      <div className="px-5 py-3">
        <p className="text-sm py-2">Please provide detailed information of the incident in this form</p>
        <hr/>
        <NewReportForm />
        <div className="flex flex-col gap-2">
        <button className="bg-primary rounded-full text-white py-1">Save</button>
        <button className="bg-primary rounded-full text-white py-1">Cancel</button>
        </div>
      </div>
    </div>
  );
}
