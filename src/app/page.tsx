import prisma from "@/prisma/index";
// import { Report } from "@prisma/client";

async function main() {
  try {
    // Create a new report
    const newReport = await prisma.report.create({
      data: {
        incident_report_number: "IR-" + Date.now(),
        report_origin: "user_created", // or "witness_text"
        report_initiated_at: new Date(),
        report_stage: "data_gathering",
        incident_type: "Example Incident",
        description: "This is a test report created via Prisma.",
        location: "Test Location",
        report_last_updated_at: new Date(),
        ppd_notified: false,

        // If you want to include messages
        messages: {
          message_id: "MSG-" + Date.now(),
          from: "from here",
          to: "to here",
          message_content: "Initial message for the report.",
          created_at: new Date(),
        },
      },
    });

    console.log("New report created:", newReport);

    // Fetch all reports (for verification)
    const allReports = await prisma.report.findMany();
    console.log("All reports:", allReports);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Home() {
  main();

  const report = await prisma.report.findFirst({
    where: {
      incident_report_number: "IR-1722748034294",
    },
  });

  return (
    <div className="w-full flex justify-center">
      <h1>This is the home page.</h1>
      <p>{report.incident_report_number}</p>
    </div>
  );
}

// IR-1722748034294
//     "types": ["@prisma/client"],
