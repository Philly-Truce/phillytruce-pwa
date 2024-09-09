import React, { useState, useRef, useEffect } from "react";

const Otp = ({ onComplete, onResend }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendCountdown, setResendCountdown] = useState(30);
  const buttonDisabled = otp.some((value) => value === "");
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
  };

  const handleConfirm = () => {
    onComplete(otp.join(""));
  };

  const handleResendCode = () => {
    setResendCountdown(30);
    onResend();
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
              value={otp[index]}
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
          <button
            className={`px-6 py-3 w-full rounded-3xl text-sm font-medium ${
              buttonDisabled
                ? "bg-accent text-primary text-opacity-40"
                : "bg-primary text-white"
            }`}
            type="button"
            onClick={handleConfirm}
            disabled={buttonDisabled}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
