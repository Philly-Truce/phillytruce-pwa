"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function Main() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(event.target.value);
  };

  const buttonDisabled = !emailInputValue || !passwordInputValue;

  return (
    <div id="login-page" className="mt-36 w-full px-4">
      <section>
        <h1 className="text-3xl text-primary font-semibold mb-3">
          Welcome Back!
        </h1>
        <p className="text-sm text-default font-normal mb-10">
          Enter district provided email and password
        </p>
      </section>
      <section>
        <form action="" className="space-y-4">
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
              id="password"
              name="password"
              value={passwordInputValue}
              onChange={handlePasswordInputChange}
              placeholder="Password"
              className="p-4 focus:outline-none w-full"
            />
          </fieldset>
        </form>
      </section>
      <section>
        <Link href="/login-otp">
          {buttonDisabled ? (
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
          )}
        </Link>
      </section>
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
