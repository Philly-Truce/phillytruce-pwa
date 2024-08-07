import React from "react";
import LoginForm from "./form-submission";

export default function Main() {
  return (
    <div>
      <section className="mb-4">
        <div className="mb-36"></div>
        <h1 className="text-3xl text-primary font-semibold mb-3">
          Welcome Back!
        </h1>
        <p className="text-sm text-default font-normal mb-10">
          Enter district provided email and password
        </p>
      </section>
      <form id="register" className="mb-10">
        <LoginForm />
      </form>
      <a href="#" className="text-xs underline text-link mb-3">
        Need help loggin in?
      </a>
      <p className="text-xs font-semibold text-accent2 pb-44">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-xs underline text-link mb-3 font-normal">
          Sign up
        </a>
      </p>
    </div>
  );
}
