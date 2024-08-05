import React from "react";

export default function Main() {
  return (
    <div>
      <section className="mb-4">
        <h3 className="text-xl text-primary font-medium mb-2">
          Confirm your phone number
        </h3>
        <p className="text-sm opacity-60">
          Enter the code that we just texted you at<br></br>(215) 643-9802
        </p>
      </section>
      <section>
        <div className="my-2 text-center">
          <div id="otp" className="inline-flex space-x-2">
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="first"
              maxLength={1}
            />
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="second"
              maxLength={1}
            />
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="third"
              maxLength={1}
            />
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="fourth"
              maxLength={1}
            />
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="fifth"
              maxLength={1}
            />
            <input
              className="flex-1 m-2 text-center rounded border-2 border-accent2 w-12 h-12"
              type="text"
              id="sixth"
              maxLength={1}
            />
          </div>
        </div>
        <p className="text-xs underline text-link mb-3">Resend code in 30 seconds</p>
      </section>
    </div>
  );
}
