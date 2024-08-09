import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { FaBatteryFull } from "react-icons/fa6";

interface TopBannerProps {
  page:
    | "home"
    | "reports"
    | "reports-view"
    | "more"
    | "messages"
    | "edit"
    | "create"
    | "profile"
    | "resources"
    | "settings";
}

export default function TopBanner({ page }: TopBannerProps) {
  const getPageTitle = () => {
    switch (page) {
      case "reports":
        return "Reports";
      case "reports-view":
        return "Report";
      case "messages":
        return "Messages";
      case "edit":
        return "Edit Report";
      case "create":
        return "Create New Report";
      case "profile":
        return "Profile";
      case "resources":
        return "Resources";
      case "settings":
        return "Settings";
      default:
        return "Welcome Alyssa!";
    }
  };

  return (
    // <header>
    <div
      id="top-banner"
      className="px-4 py-2 bg-primary text-center items-center fixed w-full flex justify-between min-h-16"
    >
      <div
        id="circle-background"
        className="rounded-full w-5 h-5 bg-slate-400 relative flex gap-1"
      >
        <div
          id="initials"
          className="absolute text-white text-center text-xs font-bold leading-[100%] tracking-[0.5px] top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
        >
          AV
        </div>
      </div>
      <h1 className="text-white text-[22px] font-normal leading-7">
        {getPageTitle()}
      </h1>
      <div id="placeholder" className="w-5 h-5"></div>
    </div>
    // </header>
  );
}
