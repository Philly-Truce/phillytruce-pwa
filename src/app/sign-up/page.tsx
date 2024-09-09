"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<IFormInput>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.token);
        router.push(`/sign-up/otp/${encodeURIComponent(data.phoneNumber)}`);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred during sign up");
    }
  };

  return (
    <div id="sign-up-page" className="my-16 w-full px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="my-10 text-center text-2xl">Welcome to Philly Truce.</h1>
        <fieldset
          className={`border-2 ${
            touchedFields.name && errors.name
              ? "border-red-500"
              : "border-accent2"
          } rounded`}
        >
          <legend className="text-xs mx-3 px-1">Name</legend>
          <input
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z]{2,} [A-Za-z]{2,}$/,
                message: "Please enter your full name (First Last)",
              },
            })}
            placeholder="John Smith"
            className="p-4 focus:outline-none w-full"
          />
        </fieldset>
        {touchedFields.name && errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}

        <fieldset
          className={`border-2 ${
            touchedFields.email && errors.email
              ? "border-red-500"
              : "border-accent2"
          } rounded`}
        >
          <legend className="text-xs mx-3 px-1">Email</legend>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="abc@gmail.com"
            className="p-4 focus:outline-none w-full"
          />
        </fieldset>
        {touchedFields.email && errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}

        <fieldset
          className={`border-2 ${
            touchedFields.phoneNumber && errors.phoneNumber
              ? "border-red-500"
              : "border-accent2"
          } rounded`}
        >
          <legend className="text-xs mx-3 px-1">Phone Number</legend>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            placeholder="1234567890"
            className="p-4 focus:outline-none w-full"
          />
        </fieldset>
        {touchedFields.phoneNumber && errors.phoneNumber && (
          <span className="text-xs text-red-500">
            {errors.phoneNumber.message}
          </span>
        )}

        <div className="flex items-center space-x-3 my-5 w-fit">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", {
              required: "You must agree to the terms and conditions",
            })}
          />
          <label htmlFor="terms">
            I agree with{" "}
            <span className="text-blue-500 underline">
              terms and conditions
            </span>{" "}
            at Philly Truce.
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
        )}

        <div className="flex items-center justify-center space-x-8 mt-16">
          <Link href="/login">
            <button type="button" className="text-red-500">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className={`rounded-2xl px-3 py-1 ${
              isValid
                ? "bg-primary text-white"
                : "bg-gray-200 text-slate-400 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Sign Up
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
