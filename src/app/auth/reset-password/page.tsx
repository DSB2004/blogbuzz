"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import Button_2 from "@/app/_components/button/button_2";
import Button_1 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
import { useError } from "../../_context/useError.context";
import ResetPasswordAction from "./actions";

export default function page() {
  const { showError } = useError();
  const [validateError, setError] = useState<{
    newPassword: string | undefined;
    copyPassword: string | undefined;
  } | null>(null);
  const [state, action] = useFormState(ResetPasswordAction, null);

  useEffect(() => {
    setError(null);
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
      <title>Reset Password</title>
      <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">
        <form
          action={action}
          style={{ boxShadow: "10px 10px 0px  black" }}
          className="bg-white min-h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto"
        >
          <h1 className=" my-5  text-3xl font-bold text-center uppercase">
            Reset Password
          </h1>

          <p className="text-md mb-3">Create a new Password</p>

          <Input_1
            name="new-password"
            type="password"
            placeholder="Enter your new password...."
            error={validateError ? validateError.newPassword : ""}
          />

          <Input_1
            name="copy-password"
            type="password"
            placeholder="Re-enter your password...."
            error={validateError ? validateError.copyPassword : ""}
          />

          <Button_2 type="submit" className=" mt-4 w-64">
            Sumbit Login Info
          </Button_2>
        </form>
      </main>
    </>
  );
}
