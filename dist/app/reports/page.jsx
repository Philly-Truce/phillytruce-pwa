import List from "../../components/reports/list";
import SearchBar from "@/components/search-bar";
export default function Main() {
    return (<div id="reports-page-container" className="overflow-y-scroll flex flex-col gap-4 pt-20 px-4">
      <SearchBar page="reports"/>
      <List />
    </div>);
}
