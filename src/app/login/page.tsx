'use client'
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function Main() {
  const [mobileInputValue, setMobileInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [mobilePwdInputValue, setMobilePwdInputValue] = useState("");
  const [emailPwdInputValue, setEmailPwdInputValue] = useState("");

  const handleMobileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMobileInputValue(event.target.value);
  };
  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
  };
  const handleMobilePwdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMobilePwdInputValue(event.target.value);
  };
  const handleEmailPwdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailPwdInputValue(event.target.value);
  };

  const [mobileOption, setMobileOption] = useState(true);

  var emailContinueDisabled = !emailInputValue || !emailPwdInputValue;
  var mobileContinueDisabled = !mobileInputValue || !mobilePwdInputValue;

  return (
    <div id="login-page" className="mt-36 w-full px-4">
      <section>
        <h1 className="text-3xl text-primary font-semibold mb-3">
          Welcome Back!
        </h1>
        {mobileOption ? (
          <p className="text-sm text-default font-normal mb-10">
            Enter your mobile phone number and password
          </p>
        ) : (
          <p className="text-sm text-default font-normal mb-10">
            Enter your email and password
          </p>
        )}
      </section>
      <section>
        <form action="" className="space-y-4">
          {mobileOption ? (
            <div>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Mobile</legend>
                <input
                  type="mobile"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Phone"
                  value={mobileInputValue}
                  onChange={handleMobileInputChange}
                  className="p-4 focus:outline-none w-full"
                />
              </fieldset>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Password</legend>
                <input
                  type="password"
                  id="mobilePwd"
                  name="mobilePwd"
                  value={mobilePwdInputValue}
                  onChange={handleMobilePwdInputChange}
                  placeholder="Password"
                  className="p-4 focus:outline-none w-full"
                />
              </fieldset>
            </div>
          ) : (
            <div>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Email</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={emailInputValue}
                  onChange={handleEmailInputChange}
                  className="p-4 focus:outline-none w-full"
                />
              </fieldset>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Password</legend>
                <input
                  type="password"
                  id="emailPwd"
                  name="emailPwd"
                  value={emailPwdInputValue}
                  onChange={handleEmailPwdInputChange}
                  placeholder="Password"
                  className="p-4 focus:outline-none w-full"
                />
              </fieldset>
            </div>
          )}
        </form>
      </section>
      <section>
        {mobileOption ? (
          <div>
            <button
              className="my-8 bg-primary px-6 py-3 w-full rounded-3xl text-sm font-medium text-white"
              type="button"
              onClick={() => {
                setMobileOption(!mobileOption);
                setMobileInputValue("");
                setMobilePwdInputValue("");
              }}
            >
              Use Email
            </button>
          </div>
        ) : (
          <div>
            <button
              className="my-8 bg-primary px-6 py-3 w-full rounded-3xl text-sm font-medium text-white"
              type="button"
              onClick={() => {
                setMobileOption(!mobileOption);
                setEmailInputValue("");
                setEmailPwdInputValue("");
              }}
            >
              Use Mobile
            </button>
          </div>
        )}
      </section>
      <Link href={mobileOption ? "/login-otp-mobile" : "/login-otp-email"}>
        <button
          className={`my-8 ${
            mobileOption
              ? mobileContinueDisabled
                ? "bg-accent"
                : "bg-primary"
              : emailContinueDisabled
              ? "bg-accent"
              : "bg-primary"
          } px-6 py-3 w-full rounded-3xl text-sm font-medium ${
            mobileOption
              ? mobileContinueDisabled
                ? "text-primary text-opacity-40"
                : "text-white"
              : emailContinueDisabled
              ? "text-primary text-opacity-40"
              : "text-white"
          }`}
          type="button"
          disabled={
            mobileOption ? mobileContinueDisabled : emailContinueDisabled
          }
        >
          CONTINUE
        </button>
      </Link>
      <section>
        <a href="#" className="text-xs underline text-link">
          Need help logging in?
        </a>
        <p className="text-xs font-semibold text-accent2">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-xs underline text-link font-normal">
            Sign up
          </a>
        </p>
      </section>
    </div>
  );
}
