"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Otp() {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const buttonDisabled = !otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6;
  const handleAction = [];
  const handleOtp1Change = (event) => {
    setOtp1(event.target.value);
  };
  handleAction.push(handleOtp1Change);
  const handleOtp2Change = (event) => {
    setOtp2(event.target.value);
  };
  handleAction.push(handleOtp2Change);
  const handleOtp3Change = (event) => {
    setOtp3(event.target.value);
  };
  handleAction.push(handleOtp3Change);
  const handleOtp4Change = (event) => {
    setOtp4(event.target.value);
  };
  handleAction.push(handleOtp4Change);
  const handleOtp5Change = (event) => {
    setOtp5(event.target.value);
  };
  handleAction.push(handleOtp5Change);
  const handleOtp6Change = (event) => {
    setOtp6(event.target.value);
  };
  handleAction.push(handleOtp6Change);

  return (
    <div>
      <section className="mb-32">
        <div className="my-2 text-center">
          <div className="inline-flex space-x-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                className="flex-1 text-center rounded border-2 border-accent2 w-12 h-12 text-primary text-2xl otp"
                type="text"
                maxLength={1}
                onChange={handleAction[index]}
              />
            ))}
          </div>
        </div>
        <a href="#" className="text-xs underline text-link mb-3 mt-4">
          Resend code in 30 seconds
        </a>
      </section>
      <Link href="/home">
        {buttonDisabled == true ? (
          <button
            className="bg-accent px-6 py-3 w-full rounded-3xl text-sm font-medium text-primary text-opacity-40"
            type="button"
            disabled={buttonDisabled}
          >
            CONFIRM
          </button>
        ) : (
          <button
            className="bg-primary px-6 py-3 w-full rounded-3xl text-sm font-medium text-white"
            type="button"
            disabled={buttonDisabled}
          >
            CONFIRM
          </button>
        )}
      </Link>
    </div>
  );
}
