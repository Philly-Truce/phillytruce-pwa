import React from "react";
import ProfileIcon from "@/assets/icons/profile-icon";
import PhoneIcon from "@/assets/icons/phone-icon";
import ResourcesIcon from "@/assets/icons/resources-icon";
import RightArrow from "@/assets/icons/right-arrow";
import Divider from "@/assets/icons/Divider";
import AnalyticsIcon from "@/assets/icons/analytics-icon";
import SettingsIcon from "@/assets/icons/settings-icon";


interface Options {
  icon: React.ReactNode;
  option: string;
}

const MenuOption = ({ icon, option }: Options) => {
  return (
    <>

      <div className="flex p-5">
        <div className="w-3/4 flex justify-start items-center">
          <div className="mr-3">{icon}</div>{option}</div>
        <div className="w-1/4  flex justify-end items-center">
          <RightArrow /></div>
      </div>
      <Divider />
    </>
  )
}

export default function MenuDrawer() {
  return (
    <div className="bg-white text-black">
      <div className="flex flex-col">
        <ul>
          <MenuOption icon={<ProfileIcon />} option="Profile" />
          <MenuOption icon={<PhoneIcon />} option="Contacts" />
          <MenuOption icon={<ResourcesIcon />} option="Resources" />
          <MenuOption icon={<AnalyticsIcon />} option="Analytics" />
          <MenuOption icon={<SettingsIcon />} option="Settings" />
          <MenuOption icon={<ProfileIcon />} option="Help Center" />
        </ul>
        <button className="mt-32 items-center bg-[#1C4587] rounded-full  text-white w-full py-3">
        Log Out
      </button>
      </div>
     
     
      </div>
    
  );
}
