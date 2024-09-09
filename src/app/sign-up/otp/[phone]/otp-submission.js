"use client";
import React, { useState, useRef } from "react";

export default function Otp({ onComplete }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendCountdown, setResendCountdown] = useState(30);
  const buttonDisabled = otp.some((value) => value === "");
  const inputRefs = useRef([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
  };

  const handleConfirm = () => {
    onComplete();
  };

  const handleResendCode = () => {
    setResendCountdown(30);
  };

  return (
    <div className="w-full">
      <div className="text-center my-4">
        <div className="flex justify-between gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="flex-1 text-center rounded border-2 border-accent2 w-12 h-12 text-primary text-2xl otp"
              type="text"
              maxLength={1}
              onChange={(event) => handleChange(event, index)}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          {resendCountdown > 0 ? (
            <span className="text-xs text-link">
              Resend code in {resendCountdown} seconds
            </span>
          ) : (
            <a
              href="#"
              onClick={handleResendCode}
              className="text-xs underline text-link"
            >
              Resend code
            </a>
          )}
        </div>
        <div style={{ marginTop: "9rem" }}>
          {buttonDisabled ? (
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
              onClick={handleConfirm}
            >
              CONFIRM
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
