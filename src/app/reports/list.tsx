import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadixui/tabs";
import ReportList from "@/app/reports/reportList.js";

export default function List() {
  return (
    <div>
      <Tabs defaultValue="unclaimed">
        <TabsList>
          <TabsTrigger value="unclaimed">Unclaimed</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value="unclaimed">
          <ReportList />
        </TabsContent>
        <TabsContent value="progress">
          Here are cases that are in-progress.
        </TabsContent>
        <TabsContent value="closed">Here are closed cases.</TabsContent>
      </Tabs>
    </div>
  );
}
