const { PrismaClient } = require("@prisma/client");
// const dotenv = require("dotenv");
// dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

export default prisma;

// async function main() {
//   try {
//     // Create a new report
//     const newReport = await prisma.report.create({
//       data: {
//         incident_report_number: "IR-" + Date.now(),
//         report_origin: "user_created", // or "witness_text"
//         report_initiated_at: new Date(),
//         report_stage: "data_gathering",
//         incident_type: "Example Incident",
//         description: "This is a test report created via Prisma.",
//         location: "Test Location",
//         report_last_updated_at: new Date(),
//         ppd_notified: false,
//         // If you want to associate with a user (for user-created reports)
//         creator_user: {
//           connect: { id: "user_id_here" }, // Replace with an actual user ID
//         },
//         // If you want to include messages
//         messages: {
//           message_id: "MSG-" + Date.now(),
//           user_id: "user_id_here", // Replace with an actual user ID
//           message_content: "Initial message for the report.",
//           created_at: new Date(),
//         },
//       },
//     });

//     console.log("New report created:", newReport);

//     // Fetch all reports (for verification)
//     const allReports = await prisma.report.findMany();
//     console.log("All reports:", allReports);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
