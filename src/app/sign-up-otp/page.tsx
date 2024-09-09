"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const sendVerificationCode = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (data.status !== "pending") {
        setError("Failed to send verification code");
      }
    } catch (error) {
      setError("Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    sendVerificationCode();
  }, [sendVerificationCode]);

  const handleOtpCompletion = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/check-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, code: otp }),
      });
      const data = await response.json();
      if (data.status === "approved") {
        router.push("/login");
      } else {
        setError("Invalid verification code");
      }
    } catch (error) {
      setError("Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="otp-page" className="mt-36 w-full mx-4">
      <h3 className="text-xl text-primary font-semibold mb-2">
        Confirm your phone number
      </h3>
      <p className="text-sm opacity-60">
        Enter the code that we just texted you at
        <br />
        {phoneNumber}
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="Enter 6-digit OTP"
        className="mt-4 p-2 border rounded w-full"
        maxLength={6}
      />
      <button
        onClick={handleOtpCompletion}
        className={`mt-4 bg-primary text-white p-2 rounded w-full ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={sendVerificationCode}
        className={`mt-4 text-primary p-2 rounded w-full ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        Resend Code
      </button>
    </div>
  );
}
