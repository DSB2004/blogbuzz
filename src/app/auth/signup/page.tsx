"use client";

import React, { useEffect, FormEvent, useState } from "react";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import Button_2 from "@/app/_components/button/button_2";
import Button_1 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
import { useError } from "../../_context/useError.context";
import RegisterAction from "./actions";

export default function page() {
  const { showError } = useError();

  const [validateError, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  } | null>(null);

  const [state, action] = useFormState(RegisterAction, null);

  useEffect(() => {
    // error loop
    if (state) {
      if (state.type === "VALIDATION" && typeof state.msg !== "string") {
        setError(state.msg);
      } else if (typeof state.msg === "string") {
        showError(state.type, state.msg);
      }
    }
  }, [state]);

  return (
    <>
      <title>SignUp</title>
      <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">
        <form
          style={{ boxShadow: "10px 10px 0px  black" }}
          action={action}
          className="bg-white min-h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto"
        >
          <h1 className=" my-4 text-3xl font-bold text-center uppercase">
            SignUp With BlogBuzz
          </h1>

          <Input_1
            className="mt-4"
            name="register-name"
            type="text"
            placeholder="Enter your name...."
            error={validateError ? validateError.name : ""}
          />

          <Input_1
            name="register-email"
            type="text"
            placeholder="Enter your email...."
            error={validateError ? validateError.email : ""}
          />

          <Input_1
            name="register-password"
            type="password"
            placeholder="Enter your password...."
            error={validateError ? validateError.password : ""}
          />

          <Input_1
            name="register-confirm-password"
            type="password"
            placeholder="Enter your password...."
            error={validateError ? validateError.confirmPassword : ""}
          />

          <Button_2 type="submit" className="my-4 w-64">
            Create New Account
          </Button_2>
        </form>
      </main>
    </>
  );
}
