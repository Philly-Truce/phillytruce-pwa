import React from "react";
import ProfileIcon from "@/assets/icons/profile-icon";
import PhoneIcon from "@/assets/icons/phone-icon";
import ResourcesIcon from "@/assets/icons/resources-icon";
import RightArrow from "@/assets/icons/right-arrow";
import AnalyticsIcon from "@/assets/icons/analytics-icon";
import SettingsIcon from "@/assets/icons/settings-icon";
import HelpIcon from "@/assets/icons/help-icon";
import Divider from "@/assets/icons/divider";
import Link from "next/link";


interface Options {
  icon?: React.ReactNode;
  option: string;
  onClick?: () => void;
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
      <div className="flex flex-col gap-44">
        <ul>
          <MenuOption icon={<ProfileIcon />} option="Profile" />
          <MenuOption icon={<PhoneIcon />} option="Contacts" />
          <MenuOption icon={<ResourcesIcon />} option="Resources" />
          <MenuOption icon={<AnalyticsIcon />} option="Analytics" />
          <Link href="/messages"><MenuOption icon={<SettingsIcon />} option="Settings" /></Link>
          <MenuOption icon={<HelpIcon />} option="Help Center" />
        </ul>
        <button className="items-center bg-[#1C4587] rounded-full  text-white w-full py-3">
        Log Out
      </button>
      </div>
     
     
      </div>
    
  );
}
