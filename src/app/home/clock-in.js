"use client";
import { useState } from "react";
import { LuClock } from "react-icons/lu";

export default function ClockIn() {
  const [clockIn, setClockIn] = useState(false);

  return (
    <div className="mt-4">
      {clockIn ? (
        <div>
          <button
            className="bg-white pl-4 pr-6 py-3 mb-2 w-full rounded-3xl text-sm font-medium text-primary border-default border-2 text-center align-middle inline-flex justify-center drop-shadow-lg"
            type="button"
            onClick={() => setClockIn(!clockIn)}
          >
            <LuClock className="self-center mr-2 text-base" />
            <span className="ml-2">Clock Out</span>
          </button>
          <p className="text-xs text-center mb-6">
            Click here to end your shift
          </p>
          <div className="mt-2">
            <p className="text-xs text-center mb-6">
              2 hours til your shift ends!
            </p>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="bg-primary pl-4 pr-6 py-3 mb-2 w-full rounded-3xl text-sm font-medium text-white text-center align-middle inline-flex justify-center drop-shadow-lg"
            type="button"
            onClick={() => setClockIn(!clockIn)}
          >
            <LuClock className="self-center mr-2 text-base" />
            <span className="ml-2">Clock In</span>
          </button>
          <p className="text-xs text-center mb-6">
            Click here to start your shift
          </p>
        </div>
      )}
    </div>
  );
}
