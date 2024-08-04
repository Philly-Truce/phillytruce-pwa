import { IoSearchSharp } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div
      id="search-bar"
      className="flex items-center justify-between bg-accent rounded-[1.75rem] p-2 my-4"
    >
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
  );
}
