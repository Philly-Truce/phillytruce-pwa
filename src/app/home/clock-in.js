"use client";
import { useState, useEffect } from "react";
import { LuClock } from "react-icons/lu";
import "./home.css";
import { startProgressBar } from "./countdown";

export default function ClockIn() {
  const [clockIn, setClockIn] = useState(false);
  const hours = 2; // Hours to Serve

  useEffect(() => {
    if (clockIn) {
      startProgressBar(hours);
    }
  }, [clockIn]);

  return (
    <div>
      {clockIn ? (
        <div className="space-y-1">
          <p className="text-xs text-center">Click here to end your shift</p>
          <button
            className="bg-white py-3 mb-2 w-full rounded-3xl text-sm font-medium text-primary border-default border-2 text-center align-middle inline-flex justify-center drop-shadow-lg"
            type="button"
            onClick={() => setClockIn(!clockIn)}
          >
            <LuClock className="self-center mr-2 text-base" />
            <span className="ml-2">Clock Out</span>
          </button>

          <div className="flex mt-2 w-16">
            <div className="time-remain-bar bg-primary"></div>
            <div className="time-served-bar bg-accent"></div>
          </div>

          <div className="mt-2 flex justify-center items-center">
            <div id="timeRemainNumber" className="text-xs text-center my-1">
              2
            </div>
            &nbsp;
            <p className="text-xs text-center my-1">
              hours til your shift ends!
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-center mb-2">
            Click here to start your shift
          </p>
          <button
            className="bg-primary py-3 mb-2 w-full rounded-3xl text-sm font-medium text-white text-center align-middle inline-flex justify-center drop-shadow-lg"
            type="button"
            onClick={() => setClockIn(!clockIn)}
          >
            <LuClock className="self-center mr-2 text-base" />
            <span className="ml-2">Clock In</span>
          </button>
        </div>
      )}
    </div>
  );
}
