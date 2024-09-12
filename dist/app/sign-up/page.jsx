"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
export default function SignUp() {
    const { register, handleSubmit, formState: { errors, isValid, touchedFields }, } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const [signUpCompleted, setSignUpCompleted] = React.useState(false);
    const [countdown, setCountdown] = React.useState(3);
    const [error, setError] = React.useState(null);
    const router = useRouter();
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = yield response.json();
            if (result.success) {
                setSignUpCompleted(true);
                localStorage.setItem("token", result.token);
            }
            else {
                setError(result.message);
            }
        }
        catch (error) {
            console.error("An error occurred during sign up", error);
            setError("An error occurred during sign up");
        }
    });
    React.useEffect(() => {
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
    return (<div id="sign-up-page" className="my-16 w-full px-4">
      {signUpCompleted ? (<div className="bg-primary rounded-2xl py-40 my-10 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
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
        </div>) : (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="my-10 text-center text-2xl">
            Welcome to Philly Truce.
          </h1>
          <fieldset className={`border-2 ${touchedFields.name && errors.name
                ? "border-red-500"
                : "border-accent2"} rounded`}>
            <legend className="text-xs mx-3 px-1">Name</legend>
            <input {...register("name", {
            required: "Name is required",
            pattern: {
                value: /^[A-Za-z]{2,} [A-Za-z]{2,}$/,
                message: "Please enter your full name (First Last)",
            },
        })} placeholder="John Smith" className="p-4 focus:outline-none w-full"/>
          </fieldset>
          {touchedFields.name && errors.name && (<span className="text-xs text-red-500">{errors.name.message}</span>)}

          <fieldset className={`border-2 ${touchedFields.email && errors.email
                ? "border-red-500"
                : "border-accent2"} rounded`}>
            <legend className="text-xs mx-3 px-1">Email</legend>
            <input {...register("email", {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
            },
        })} placeholder="abc@gmail.com" className="p-4 focus:outline-none w-full"/>
          </fieldset>
          {touchedFields.email && errors.email && (<span className="text-xs text-red-500">{errors.email.message}</span>)}

          <fieldset className={`border-2 ${touchedFields.phoneNumber && errors.phoneNumber
                ? "border-red-500"
                : "border-accent2"} rounded`}>
            <legend className="text-xs mx-3 px-1">Phone Number</legend>
            <input {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
            },
        })} placeholder="1234567890" className="p-4 focus:outline-none w-full"/>
          </fieldset>
          {touchedFields.phoneNumber && errors.phoneNumber && (<span className="text-xs text-red-500">
              {errors.phoneNumber.message}
            </span>)}

          <div className="flex items-center space-x-3 my-5 w-fit">
            <input type="checkbox" id="terms" {...register("terms", {
            required: "You must agree to the terms and conditions",
        })}/>
            <label htmlFor="terms">
              I agree with{" "}
              <span className="text-blue-500 underline">
                terms and conditions
              </span>{" "}
              at Philly Truce.
            </label>
          </div>
          {errors.terms && (<p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>)}

          <div className="flex items-center justify-center space-x-8 mt-16">
            <Link href="/login">
              <button type="button" className="text-red-500">
                Cancel
              </button>
            </Link>
            <button type="submit" className={`rounded-2xl px-3 py-1 ${isValid
                ? "bg-primary text-white"
                : "bg-gray-200 text-slate-400 cursor-not-allowed"}`} disabled={!isValid}>
              Sign Up
            </button>
          </div>
        </form>)}
    </div>);
}
