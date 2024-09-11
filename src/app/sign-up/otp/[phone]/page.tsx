"use client";
import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Otp from "./otp-submission";

interface PageProps {
  params: { phone: string };
}

export default function SignUpOtp({ params }: PageProps) {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const phoneNumber = decodeURIComponent(params.phone);

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

  const handleOtpCompletion = async (otp: string) => {
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
        // You can set a flag in localStorage or context to indicate verified status if needed
        localStorage.setItem("phoneVerified", "true");
      } else {
        // Even if verification fails, we're still redirecting to login
        localStorage.setItem("phoneVerified", "false");
      }
    } catch (error) {
      console.error("Failed to verify code:", error);
      localStorage.setItem("phoneVerified", "false");
    } finally {
      setIsLoading(false);
      // Always redirect to login, regardless of verification outcome
      router.push("/login");
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
      <Otp onComplete={handleOtpCompletion} onResend={sendVerificationCode} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
