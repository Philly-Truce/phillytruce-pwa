import React from "react";
import ProfileIcon from "@/assets/icons/profile-icon";
import PhoneIcon from "@/assets/icons/phone-icon";
import ResourcesIcon from "@/assets/icons/resources-icon";
import AnalyticsIcon from "@/assets/icons/analytics-icon";
import SettingsIcon from "@/assets/icons/settings-icon";
import HelpIcon from "@/assets/icons/help-icon";
import Link from "next/link";
import { MenuOption } from "@/components/ui/menu-option";




export default function MenuDrawer() {
  
  return (
    <div className="bg-white text-black">
      <div className="flex flex-col h-full">
          <ul className="flex-1">
          <Link href="/profile"><MenuOption icon={<ProfileIcon />} option="Profile" /></Link>
          <Link href="/contacts"><MenuOption icon={<PhoneIcon />} option="Contacts" /></Link>
          <Link href="/resources"><MenuOption icon={<ResourcesIcon />} option="Resources" /></Link>
          <MenuOption icon={<AnalyticsIcon />} option="Analytics" />
          <Link href="/settings"><MenuOption icon={<SettingsIcon />} option="Settings" /></Link>
          <MenuOption icon={<HelpIcon />} option="Help Center" />
        </ul>
        <button className=" items-center bg-[#1C4587] rounded-full  text-white w-full py-3">
        Sign Out
      </button>
      
      </div>
      </div>
    
      
    
  );
}
