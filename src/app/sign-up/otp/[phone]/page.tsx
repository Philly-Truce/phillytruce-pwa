"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Otp from "./otp-submission";

interface PageProps {
  params: { phone: string };
}

export default function SignUpOtp({ params }: PageProps) {
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();
  const phoneNumber = decodeURIComponent(params.phone);

  const handleOtpCompletion = () => {
    setSignUpCompleted(true);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          router.push("/login");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  if (signUpCompleted) {
    return (
      <div className="bg-primary rounded-2xl py-40 my-10 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
        <p className="text-center text-green-500 text-lg p-5">
          Sign up completed successfully! You can now log in.
          <br />
          Redirecting in {countdown} seconds...
        </p>
        <div className="mx-auto text-center my-5">
          <Link href="/login">
            <button className="bg-white p-2 w-4/6 rounded-2xl">Login</button>
          </Link>
        </div>
      </div>
    );
  }

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
      <Otp onComplete={handleOtpCompletion} />
    </div>
  );
}
