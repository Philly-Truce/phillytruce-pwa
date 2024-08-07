import Divider from "@/assets/icons/divider";
import SearchIcon from "@/assets/icons/search-icon";
import UserProfileIcon from "@/assets/icons/user-profile-icon";
import { MenuOption } from "@/components/ui/menu-option";
import React, { ReactNode } from 'react'


interface ContactInfo {
  avi: ReactNode;
  name: string;
}
function Contact({avi, name}: ContactInfo) {
  return (
    <>
    <div className="flex flex-row py-4 pl-2 ">
      <div className="pr-3">{avi}</div>{name}</div>
      <Divider />
      </>
  )
}

export default function Contacts() {


  
  return (
    
    <div className="flex flex-col w-full">
      <div className="relative flex items-center">
      <input type="text" placeholder="Search" className="bg-[#F3F3F3] rounded-3xl py-3 pl-14 mb-2 w-full" />
      <div className="absolute p-2 bottom-0.5"><SearchIcon /></div>
      </div>
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />
      <Contact avi={<UserProfileIcon />} name="Name Name" />

    </div>   
  );
}
