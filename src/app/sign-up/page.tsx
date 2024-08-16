"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

export default function SignUp() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordInputValue2, setPasswordInputValue2] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const router = useRouter();

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
  };

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value);
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(event.target.value);
  };

  const handlePasswordInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue2(event.target.value);
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    if (!/^[A-Za-z]{2,} [A-Za-z]{2,}$/.test(nameInputValue)) {
      return false;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInputValue)
    ) {
      return false;
    }

    if (!/^(?=.*[!@#$%^&*]).{6,}$/.test(passwordInputValue)) {
      return false;
    }

    if (!isChecked) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setSignUpCompleted(true);
      console.log({
        nameInputValue,
        emailInputValue,
        passwordInputValue,
        terms: isChecked,
      });
    } else {
      console.log("Validation failed");
    }
  };

  useEffect(() => {
    if (signUpCompleted) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        router.push("/login");
      }

      return () => clearInterval(countdownInterval);
    }
  }, [signUpCompleted, countdown, router]);

  const buttonDisabled =
    !emailInputValue || !nameInputValue || !passwordInputValue || !isChecked;

  return (
    <div id="sign-up-page" className="my-16 w-full px-4">
      {signUpCompleted ? (
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
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="my-5 text-center">Welcome to Philly Truce.</h1>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Name</legend>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              value={nameInputValue}
              onChange={handleNameInputChange}
              className="p-4 focus:outline-none w-full"
            />
          </fieldset>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Email</legend>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
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
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Retype Password</legend>
            <input
              type="password"
              id="password2"
              name="password2"
              value={passwordInputValue2}
              onChange={handlePasswordInputChange2}
              placeholder="Password"
              className="p-4 focus:outline-none w-full"
            />
          </fieldset>
          <div
            onClick={handleCheckboxClick}
            style={{ cursor: "pointer" }}
            className="flex items-center space-x-3 my-5 w-fit"
          >
            {isChecked ? (
              <MdOutlineCheckBox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )}
            <p>
              I agree with{" "}
              <span className="text-blue-500 underline">
                Terms and conditions
              </span>{" "}
              at Philly Truce.
            </p>
          </div>
          <div className="flex justify-center space-x-8 mt-16">
            <Link href="/login">
              <button type="button" className="text-red-500">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className={`bg-primary rounded-2xl px-3 py-1 text-white ${
                buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={buttonDisabled}
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
