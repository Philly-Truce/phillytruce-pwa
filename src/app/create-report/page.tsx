import NewReportForm from "@/components/createReport/NewReportForm";
// import { GoArrowLeft } from "react-icons/go";

export default function createReport() {
  return (
    <div className="scroll-smooth">
      <div className="flex flex-row bg-primary text-white h-[64px] justify-start items-center p-[16px] gap-4">
        {/* <GoArrowLeft size={25}/> */}
        <h1 className="text-xl">Create New Report</h1>
      </div>
      <div className="px-5 py-3">
        <p className="text-sm py-2">Please provide detailed information of the incident in this form</p>
        <hr/>
        <NewReportForm />
        <div className="flex flex-col gap-2 py-8 sticky">
        <button className="bg-primary rounded-xl text-white text-sm py-2">SAVE</button>
        <button className="rounded-xl text-primary text-sm py-2 p-1 border border-black">CANCEL</button>
        </div>
      </div>
    </div>
  );
}
