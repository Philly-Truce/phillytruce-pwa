import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/shadcn-ui/tabs";
  // import ReportsBrief from "../../data/reports-brief";
  import MockReportsBrief from "@/data/reports-brief-mock";
  import { ReportSummaryType } from "@/app/reports/page";
  import { ReportSummary } from "./ReportSummary";
  
  export default function ReportList({ reports } : { reports: any}) {


    return (
      <div id="shadcn-tabs-component" className="">
        <Tabs defaultValue="unclaimed">
          <TabsList>
            <TabsTrigger value="unclaimed">Unclaimed</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <TabsContent value="unclaimed">
            {/* <MockReportsBrief /> */}
            {reports?.unclaimed.length === 0 ? ('There are no reports that are ready to be claimed.') : reports?.unclaimed.map((report : ReportSummaryType) => (
                <ReportSummary key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="progress">
           
            {reports?.closed.length === 0 ? ('There are no reports that have been claimed.') : reports?.claimed.map((report : ReportSummaryType) => (
                <ReportSummary key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="closed">
          {reports?.closed.length === 0 ? ('There are no reports that have been closed.') : reports?.closed.map((report : ReportSummaryType) => (
                <ReportSummary key={report.id} report={report} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  