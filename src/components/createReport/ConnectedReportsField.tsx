import textIcon from "../../assets/create-form-image/textIcon.svg";
import dropdownIcon from "../../assets/create-form-image/dropdownIcon.svg";
import Image from "next/image";
import { useState } from "react";



export default function ConnectedReportsField(){
  const [description, setDescription] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value)
  };
    return(
        <>
         <fieldset className="border p-1 rounded-md border-black">
          <legend className="text-sm px-2">Group with</legend>
          <div className="relative">
            <div className="flex flex-row">
              <Image src={textIcon} alt="Location Icon" />
              <input
                type="text"
                placeholder="Select any connected reports"
                className="block w-full appearance-none bg-white flex-grow-3 grow"
               
              />
              <Image src={dropdownIcon} alt="Icon" />
            </div>
          </div>
        </fieldset>
        <small className="px-4">If none,leave blank</small></>
    )
}