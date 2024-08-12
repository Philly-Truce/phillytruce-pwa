import Link from "next/link";

export type Report = {
  statusType: string;
};

type StatusConfiguration = {
  dialogTitle: string;
  dialogDescription: string;
  ctaButtonText: string;
  buttonTWClasses: string;
};

const reportStatusState = (
  statusType: string
): StatusConfiguration | undefined => {
  const statusConfigurations: { [key: string]: StatusConfiguration } = {
    unclaimed: {
      dialogTitle: "Would you like to claim this report?",
      dialogDescription:
        "Claiming this report will make it attached to you as a Safe Path Monitor and you will be responsible for resolving it.",
      ctaButtonText: "Claim Report",
      buttonTWClasses: "bg-primary text-white",
    },
    "in progress": {
      dialogTitle: "Would you like to close this report?",
      dialogDescription:
        "This report will be submitted for view and marked as closed.",
      ctaButtonText: "Close Report",
      buttonTWClasses: "bg-secondary text-black",
    },
    closed: {
      dialogTitle: "",
      dialogDescription: "",
      ctaButtonText: "",
      buttonTWClasses: "bg-primary text-white",
    },
  };

  return statusConfigurations[statusType];
};

// Example report object - replace this with the actual report source
const report: Report = {
  statusType: "unclaimed", // Example status, adjust as needed
};

const { statusType } = report;

export default function Confirmation() {
  return (
    <div className="bg-slate-500 w-full">
      {statusType !== "closed" && (
        <div className="py-8 relative left-0 bottom-0 max-h-full flex flex-col items-center justify-center bg-white m-5 p-5 my-28 rounded-2xl">
          <h1 className="text-primary font-medium">
            Would you like to claim this report?
          </h1>
          <p className="my-10">
            Claiming this report will make it attached to you as a Safe Path
            Monitor and you will be responsible for resolving it.
          </p>
          <div className="flex flex-row justify-end px-6">
            <div className="flex flex-row gap-x-4 h-full">
              <Link href="/reports">
                <button className="text-primary font-medium">Yes</button>
              </Link>
              <Link href="/reports-view">
                <button className="text-primary font-medium">No</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
