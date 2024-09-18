"use client";

import OverviewField from "./overview-field";
import DetailField from "./detail-field";
import Continue from "./continue-modal";
import Link from "next/link";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

type ReportData = {
  incident_report_number: number;
  report_origin: string;
  report_initiated_at: Date;
  report_stage: string;
  incident_type: string[];
  description: string;
  location: string;
  report_last_updated_at: Date;
  ppd_notified: boolean;
  date: string;
  time: string;
};

type Report = {
  report: ReportData;
};

const ReportForm: React.FC<Report> = ({ report }) => {
  const methods = useForm<ReportData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      incident_report_number: report.incident_report_number || undefined,
      location: report.location || "",
      description: report.description || "",
      incident_type: report.incident_type || [],
      report_initiated_at: report.report_initiated_at,
      ppd_notified: report.ppd_notified || false,
    },
  });
  const router = useRouter();
  const handleCreateForm: SubmitHandler<ReportData> = async (data) => {
    console.log(data);
    try {
      if (!Array.isArray(data.incident_type)) {
        data.incident_type = (data.incident_type as string).split(",");
      }
      if (report.incident_report_number) {
        const res: AxiosResponse<Report> = await axios.put<Report>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-report`,
          data
        );
        console.log(res);
       
        if (res.status === 201) {
          router.push(`/reports/${res.data.report.incident_report_number}`);
        }
      } else {
        const res: AxiosResponse<Report> = await axios.post<Report>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-report`,
          data
        );
        console.log(res);
        if (res.status === 201) {
          router.push(`/reports/${res.data.report.incident_report_number}`);
        }
      }

      methods.reset();
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };

  return (
    <div className="pt-10 px-4">
      {report.incident_report_number === 0 && <Continue />}
      <p className="text-sm py-2">
        Please provide detailed information of the incident in this form
      </p>
      <hr />
      <FormProvider {...methods}>
        <form
          className="py-2"
          onSubmit={methods.handleSubmit(handleCreateForm)}
        >
          <h4 className="text-primary font-bold py-2 text-md">Overview</h4>

          <OverviewField incident_type={report ? report.incident_type : []} />

          <h4 className="text-primary font-bold text-md py-2">Details</h4>

          <DetailField
            date={report && report.report_initiated_at.toLocaleDateString()}
            time={report && report.report_initiated_at.toLocaleTimeString()}
          />

          {/* <h4 className="text-primary font-bold text-md py-2">
             Connected Reports
             </h4>
             <ConnectedReportsField/> */}

          <button className="w-full bg-primary rounded-xl text-white py-2 p-2 mb-4 text-md">
            SAVE
          </button>
          <Link href="/reports">
            {" "}
            <button className="w-full rounded-xl text-primary text-md py-2 p-1 border border-black">
              CANCEL
            </button>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default ReportForm;
