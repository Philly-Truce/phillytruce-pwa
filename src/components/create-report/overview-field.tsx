import flagIcon from "../../assets/create-form-image/flagIcon.svg";
import dropdownIcon from "../../assets/create-form-image/dropdownIcon.svg";
import Image from "next/image";
import { useState, MouseEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type ReportData = {
  incident_type: string[];
};

const OverviewField: React.FC<ReportData> = ({ incident_type }) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useFormContext<ReportData>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    incident_type ? incident_type : []
  );
  const [showIncident, setShowIncident] = useState<boolean>(false);
  const incidents = [
    "Fight",
    "Shooting",
    "Bullying",
    "Threat",
    "Weapon",
    "Other",
  ];

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    incident: string
  ) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, incident]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== incident)
      );
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowIncident(!showIncident);
  };

  
  return (
    <>
      <fieldset className="border p-1 rounded-md border-black">
        <legend className="text-sm px-2">Incident Type</legend>
        <button onClick={handleClick} className="w-full">
          <div className="flex flex-row">
            <Image src={flagIcon} alt="Flag Icon" />
            <input
              type="text"
              placeholder="Select"
              value={selectedOptions}
              className="w-full bg-white focus:outline-none"
              {...register("incident_type", {
                required:true
                // validate: (value) =>
                  // value.length > 1 ||"Please select atleast one incident option"
              })}
              readOnly
            />

            <Image src={dropdownIcon} alt="dropdown Icon" />
          </div>
        </button>
      </fieldset>
      {showIncident && (
        <div className="w-full flex flex-col bg-gray-100 px-8 py-4 gap-3 rounded-lg shadow-md">
          <small>Select all that apply</small>

          {incidents.map((incident, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="w-4 h-4"
                value={incident}
                checked={selectedOptions.includes(incident)}
                onChange={(e) => handleCheckboxChange(e, incident)}
              />
              <label className="pl-4">{incident}</label>
            </div>
          ))}
        </div>
      )}
      {errors.incident_type && (
        <p className="text-red-700 py-2">Please select atleast one incident</p>
      )}
    </>
  );
};

export default OverviewField;
