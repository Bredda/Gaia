"use client";
import React, { useState } from "react";
import SigninPage from "./signin";
import SignupPage from "./signup";

export default function Auth() {
  const [display, setDisplay] = useState<"signin" | "signup">("signup");

  return (
    <>
      {display === "signin" ? (
        <SigninPage toSignup={() => setDisplay("signup")} />
      ) : (
        <SignupPage toSignin={() => setDisplay("signin")} />
      )}
    </>
  );
}
