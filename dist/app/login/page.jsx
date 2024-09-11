"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function Main() {
    const [mobileInputValue, setMobileInputValue] = useState("");
    const [emailInputValue, setEmailInputValue] = useState("");
    const [mobilePwdInputValue, setMobilePwdInputValue] = useState("");
    const [emailPwdInputValue, setEmailPwdInputValue] = useState("");
    const handleMobileInputChange = (event) => {
        setMobileInputValue(event.target.value);
    };
    const handleEmailInputChange = (event) => {
        setEmailInputValue(event.target.value);
    };
    const handleMobilePwdInputChange = (event) => {
        setMobilePwdInputValue(event.target.value);
    };
    const handleEmailPwdInputChange = (event) => {
        setEmailPwdInputValue(event.target.value);
    };
    const [mobileOption, setMobileOption] = useState(true);
    var emailContinueDisabled = !emailInputValue || !emailPwdInputValue;
    var mobileContinueDisabled = !mobileInputValue || !mobilePwdInputValue;
    return (<div id="login-page" className="mt-36 w-full px-4">
      <section>
        <h1 className="text-3xl text-primary font-semibold mb-3">
          Welcome Back!
        </h1>
        {mobileOption ? (<p className="text-sm text-default font-normal mb-10">
            Enter your mobile phone number and password
          </p>) : (<p className="text-sm text-default font-normal mb-10">
            Enter your email and password
          </p>)}
      </section>
      <section>
        <form action="" className="space-y-4">
          {mobileOption ? (<div>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Mobile</legend>
                <input type="mobile" id="mobile" name="mobile" placeholder="Mobile Phone" value={mobileInputValue} onChange={handleMobileInputChange} className="p-4 focus:outline-none w-full"/>
              </fieldset>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Password</legend>
                <input type="password" id="mobilePwd" name="mobilePwd" value={mobilePwdInputValue} onChange={handleMobilePwdInputChange} placeholder="Password" className="p-4 focus:outline-none w-full"/>
              </fieldset>
            </div>) : (<div>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Email</legend>
                <input type="email" id="email" name="email" placeholder="Email" value={emailInputValue} onChange={handleEmailInputChange} className="p-4 focus:outline-none w-full"/>
              </fieldset>
              <fieldset className="border-2 border-accent2 rounded">
                <legend className="text-xs mx-3 px-1">Password</legend>
                <input type="password" id="emailPwd" name="emailPwd" value={emailPwdInputValue} onChange={handleEmailPwdInputChange} placeholder="Password" className="p-4 focus:outline-none w-full"/>
              </fieldset>
            </div>)}
        </form>
      </section>
      <section className="w-1/2 inline-flex pr-1">
        {mobileOption ? (<div className="w-full">
            <button className="my-8 bg-primary px-6 py-3 rounded-3xl text-sm font-medium text-white w-full" type="button" onClick={() => {
                setMobileOption(!mobileOption);
                setMobileInputValue("");
                setMobilePwdInputValue("");
            }}>
              Use Email
            </button>
          </div>) : (<div className="w-full">
            <button className="my-8 bg-primary px-6 py-3 rounded-3xl text-sm font-medium text-white w-full" type="button" onClick={() => {
                setMobileOption(!mobileOption);
                setEmailInputValue("");
                setEmailPwdInputValue("");
            }}>
              Use Mobile
            </button>
          </div>)}
      </section>
      <Link href={mobileOption ? "/login-otp-mobile" : "/login-otp-email"} className="w-1/2 inline-flex pl-1">
        <button className={`my-8 px-6 py-3 rounded-3xl text-sm font-medium w-full ${mobileOption
            ? mobileContinueDisabled
                ? "bg-accent text-primary text-opacity-40"
                : "bg-primary text-white"
            : emailContinueDisabled
                ? "bg-accent text-primary text-opacity-40"
                : "bg-primary text-white"}`} type="button" disabled={mobileOption ? mobileContinueDisabled : emailContinueDisabled}>
          Continue
        </button>
      </Link>
      <section>
        <a href="#" className="text-xs underline text-link">
          Need help logging in?
        </a>
        <div className="flex items-center space-x-2">
          <p className="text-xs font-semibold text-accent2">
            Don&apos;t have an account?{" "}
          </p>
          <Link href="/sign-up">
            <span className="text-xs underline text-link font-normal">
              Sign up
            </span>
          </Link>
        </div>
      </section>
    </div>);
}
