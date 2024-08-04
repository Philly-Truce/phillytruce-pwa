import prisma from "@/prisma/index";

export default async function TestPage() {
  const report = await prisma.report.findFirst({
    where: {
      incident_report_number: "IR-1722748034294",
    },
  });

  return (
    <>
      <div>Hello World</div>
      <div>{report.incident_report_number}</div>
    </>
  );
}
