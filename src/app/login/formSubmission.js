"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handleEmailInputChange = (event) => {
    setEmailInputValue(event.target.value);
  };
  const handlePasswordInputChange = (event) => {
    setPasswordInputValue(event.target.value);
  };
  const buttonDisabled = !emailInputValue || !passwordInputValue;

  return (
    <div>
      <fieldset className="border-2 border-accent2 rounded mb-4">
        <legend className="text-xs ml-3 px-1">Email</legend>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={emailInputValue}
          onChange={handleEmailInputChange}
          className="pl-4 my-4 focus:outline-none"
        />
      </fieldset>
      <fieldset className="border-2 border-accent2 rounded mb-4">
        <legend className="text-xs ml-3 px-1">Password</legend>
        <input
          type="password"
          id="password"
          name="password"
          value={passwordInputValue}
          onChange={handlePasswordInputChange}
          placeholder="Password"
          className="pl-4 my-4 focus:outline-none"
        />
      </fieldset>
      <Link href="/login/otp">
      {buttonDisabled == true ? (
        <button
          className="my-8 bg-accent px-6 py-3 w-full rounded-3xl text-sm font-medium text-primary text-opacity-40"
          type="button"
          disabled={buttonDisabled}
        >
          LOG IN
        </button>
      ) : (
        <button
          className="my-8 bg-primary px-6 py-3 w-full rounded-3xl text-sm font-medium text-white"
          type="button"
          disabled={buttonDisabled}
        >
          LOG IN
        </button>
      )}</Link>
    </div>
  );
}
