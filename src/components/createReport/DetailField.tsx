import locationIcon from "../../assets/create-form-image/locationIcon.svg";
import editIcon from "../../assets/create-form-image/editIcon.svg";
import dateIcon from "../../assets/create-form-image/dateIcon.svg";
import timeIcon from "../../assets/create-form-image/timeIcon.svg";
import descriptionIcon from "../../assets/create-form-image/descriptionIcon.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DateInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.placeholder = getCurrentDate();
    }
  }, []);

  return (
    <input
      type="text"
      ref={inputRef}
      className="block w-1/2 p-1 appearance-none bg-white placeholder:text-black"
      readOnly
    />
  );
};

function getCurrentDate(): string {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const dd = String(today.getDate()).padStart(2, "0");
  const yy = String(today.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${mm}/${dd}/${yy}`;
}

const getCurrentTime = (): string => {
  const now = new Date();
  let hh = now.getHours();
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  hh = hh ? hh : 12; // the hour '0' should be '12'
  const hours = String(hh).padStart(2, "0");

  return `${hours}:${mm} ${ampm}`;
};

const TimeInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.placeholder = getCurrentTime();
    }
  }, []);

  return (
    <input
      type="text"
      ref={inputRef}
      className="block w-1/2 appearance-none bg-white placeholder:text-black"
      readOnly
    />
  );
};

export default function DetailField() {
    const [incidentLocation, setIncidentLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIncidentLocation(e.target.value)
  };


  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value)
  };
  return (
    <>
      <fieldset className="border p-1 rounded-md border-black">
        <legend className="text-sm px-2">Location</legend>
        <div className="relative">
          <div className="flex flex-row">
            <Image src={locationIcon} alt="Location Icon" />
            <input
              type="text"
              placeholder="Where did this take Place?"
              className="block w-full p-1 appearance-none bg-white"
              value={incidentLocation}
              onChange={handleChange}
            />
            <Image src={editIcon} alt="Icon" />
          </div>
        </div>
      </fieldset>
      <div className="flex flex-row gap-4 py-2">
        <fieldset className="border p-1 rounded-md w-1/2 border-black">
          <legend className="text-sm px-2">Date</legend>
          <div className="relative">
            <div className="flex flex-row">
              <Image src={dateIcon} alt="Date Icon" />
              <DateInput />
            </div>
          </div>
        </fieldset>
        <fieldset className="border p-1 rounded-md w-1/2 border-black">
          <legend className="text-sm px-2">Time</legend>
          <div className="relative">
            <div className="flex flex-row">
              <Image src={timeIcon} alt="Time Icon" />
              <TimeInput />
            </div>
          </div>
        </fieldset>
      </div>
      <fieldset className="border p-1 rounded-md border-black">
        <legend className="text-sm px-2">Description</legend>
        <div className="relative">
          <div className="flex flex-row">
            <Image src={descriptionIcon} alt="Description Icon" />
            <input
              type="text"
              placeholder="Please describe/explain what happened in detail."
              className="block w-full appearance-none bg-white placeholder-wrap pb-4"
              value={description}
              onChange={handleDescriptionChange}
            />
            <Image src={editIcon} alt="Icon"/>
          </div>
        </div>
      </fieldset>
    </>
  );
}
