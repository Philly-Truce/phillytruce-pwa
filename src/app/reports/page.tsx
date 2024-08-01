import { IoSearchSharp } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadixui/tabs";
import ReportList from "@/app/reports/reportList.js";

export default function Main() {
  return (
    <div className="overflow-y-scroll">
      <section className="my-4 p-2">
        <div className="flex items-center justify-between bg-accent rounded-[1.75rem] p-2">
          <div className="flex items-center gap-5">
            <IoSearchSharp />
            <input
              type="text"
              placeholder="search for a report"
              className="bg-transparent"
            />
          </div>
          <IoMicOutline />
        </div>
      </section>
      <section>
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
      </section>
      <h1>This is the main page for reports.</h1>
      {/*  */}
    </div>
  );
}
