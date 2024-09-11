import ContactProfileIcon from "@/assets/icons/contact-profile-icon";
import Divider from "@/assets/icons/divider";
import SearchIcon from "@/assets/icons/search-icon";
import React from "react";
function Contact({ avi, name }) {
    return (<>
      <div className="flex flex-row py-4 pl-2 ">
        <div className="pr-3">{avi}</div>
        {name}
      </div>
      <Divider />
    </>);
}
export default function Contacts() {
    return (<div id="contacts-page" className="flex flex-col w-full pt-20 px-4">
      <div className="relative flex items-center">
        <input type="text" placeholder="Search" className="bg-[#F3F3F3] rounded-3xl py-3 pl-14 mb-2 w-full"/>
        <div className="absolute p-2 bottom-0.5">
          <SearchIcon />
        </div>
      </div>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
      <Contact avi={<ContactProfileIcon />} name="Name Name"/>
    </div>);
}
