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
  const [emailError, setEmailError] = useState(false);

  const [nameInputValue, setNameInputValue] = useState("");
  const [nameError, setNameError] = useState(false);

  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [passwordInputValue2, setPasswordInputValue2] = useState("");
  const [isRetypePasswordFocused, setIsRetypePasswordFocused] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const router = useRouter();

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(event.target.value);
    setEmailError(false);
  };

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value);
    setNameError(false);
  };

  const handleNameBlur = () => {
    if (nameInputValue.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordInputValue(password);
    setIsPasswordLengthValid(password.length >= 6);
    setHasSpecialChar(/[!@#$%^&*]/.test(password));
    setHasNumber(/\d/.test(password));
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    if (passwordInputValue === "") {
      setIsPasswordFocused(false);
    }
  };

  const handlePasswordInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    const retypedPassword = event.target.value;
    setPasswordInputValue2(retypedPassword);
    setDoPasswordsMatch(retypedPassword === passwordInputValue);
  };

  const handleRetypePasswordFocus = () => {
    setIsRetypePasswordFocused(true);
  };

  const handleRetypePasswordBlur = () => {
    if (passwordInputValue2 === "") {
      setIsRetypePasswordFocused(false);
    }
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    if (nameInputValue.length < 3) {
      setNameError(true);
      return false;
    }

    const nameIsValid = /^[A-Za-z]{2,} [A-Za-z]{2,}$/.test(nameInputValue);
    if (!nameIsValid) {
      setNameError(true);
      return false;
    }

    const emailIsValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInputValue);
    if (!emailIsValid) {
      setEmailError(true);
      return false;
    }

    if (!isPasswordLengthValid || !hasSpecialChar || !hasNumber) {
      return false;
    }

    if (!doPasswordsMatch) {
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

  const handleEmailBlur = () => {
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInputValue)
    ) {
      setEmailError(true);
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
    !emailInputValue ||
    !nameInputValue ||
    !passwordInputValue ||
    !isPasswordLengthValid ||
    !hasSpecialChar ||
    !hasNumber ||
    !doPasswordsMatch ||
    !isChecked;

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
          <h1 className="my-10 text-center text-2xl">
            Welcome to Philly Truce.
          </h1>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Name</legend>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              value={nameInputValue}
              onChange={handleNameInputChange}
              className={`p-4 focus:outline-none w-full ${
                nameError ? "border-red-500" : ""
              }`}
            />
          </fieldset>
          {nameError && (
            <p className="text-red-500 text-xs mt-1">
              Please fill out your full name properly
            </p>
          )}
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Email</legend>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              value={emailInputValue}
              onChange={handleEmailInputChange}
              onBlur={handleEmailBlur}
              className={`p-4 focus:outline-none w-full ${
                emailError ? "border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                A valid email address should have "@" and the domain name.
              </p>
            )}
          </fieldset>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Password</legend>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordInputValue}
              onChange={handlePasswordInputChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              placeholder="Password"
              className={`p-4 focus:outline-none w-full ${
                passwordInputValue.length > 0 &&
                (!isPasswordLengthValid || !hasSpecialChar || !hasNumber)
                  ? "border-red-500"
                  : ""
              }`}
            />
          </fieldset>
          {isPasswordFocused && (
            <ul className="flex flex-col list-disc px-5">
              <li className={isPasswordLengthValid ? "text-green-500" : ""}>
                contains 6 characters
              </li>
              <li className={hasSpecialChar ? "text-green-500" : ""}>
                contains at least 1 special character
              </li>
              <li className={hasNumber ? "text-green-500" : ""}>
                contains at least 1 number
              </li>
            </ul>
          )}
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Retype Password</legend>
            <input
              type="password"
              id="password2"
              name="password2"
              value={passwordInputValue2}
              onChange={handlePasswordInputChange2}
              onFocus={handleRetypePasswordFocus}
              onBlur={handleRetypePasswordBlur}
              placeholder="Password"
              className={`p-4 focus:outline-none w-full ${
                passwordInputValue2.length > 0 && !doPasswordsMatch
                  ? "border-red-500"
                  : ""
              }`}
            />
          </fieldset>
          {isRetypePasswordFocused && (
            <ul className="px-5 list-disc">
              <li
                className={doPasswordsMatch ? "text-green-500" : "text-red-500"}
              >
                {doPasswordsMatch
                  ? "passwords match"
                  : "passwords do not match"}
              </li>
            </ul>
          )}
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
                terms and conditions
              </span>{" "}
              at Philly Truce.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-8 mt-16">
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
