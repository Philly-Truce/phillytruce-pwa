import React from "react";
import Otp from "./otpSubmission";

export default function Main() {
  return (
    <div>
      <section className="mb-4 mt-20">
        <h3 className="text-xl text-primary font-semibold mb-2">
          Confirm your phone number
        </h3>
        <p className="text-sm opacity-60">
          Enter the code that we just texted you at<br></br>(215) 643-9802
        </p>
      </section>
      
      <div className="mb-4">
        <Otp />
        <p className="mt-4 mb-72 text-xs text-accent2 text-center">Didn&apos;t get the code? <a href="#" className="text-xs underline text-link mb-3 font-normal">Resend code</a></p>
      </div>
    </div>
  );
}
