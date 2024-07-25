import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { FaBatteryFull } from "react-icons/fa6";

export default function TopBanner() {
  return (
    <div className="bg-primary justify-between flex rounded-t-2xl p-3 px-10 text-white items-center">
      <p>Time</p>
      <div className="space-x-5 flex">
        <MdOutlineSignalCellularAlt />
        <FaWifi />
        <FaBatteryFull />
      </div>
    </div>
  );
}
