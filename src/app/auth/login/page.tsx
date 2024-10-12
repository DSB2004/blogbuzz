"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { VscGithubInverted } from "react-icons/vsc";
import { BsGoogle } from "react-icons/bs";
import Button_2 from "@/app/_components/button/button_2";
import Button_1 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
import { useError } from "../../_context/useError.context";
import LoginAction from "./actions";
import Link from "next/link";

export default function page() {
  const { showError } = useError();
  const [validateError, setError] = useState<{
    email: string | undefined;
    password: string | undefined;
  } | null>(null);
  const [state, action] = useFormState(LoginAction, null);

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
      <title>Login</title>
      <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">
        <form
          action={action}
          style={{ boxShadow: "10px 10px 0px  black" }}
          className="bg-white min-h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto"
        >
          <h1 className=" my-5  text-3xl font-bold text-center uppercase">
            Login With BlogBuzz
          </h1>

          <Input_1
            name="login-email"
            type="text"
            placeholder="Enter your email...."
            error={validateError ? validateError.email : ""}
          />

          <Input_1
            name="login-password"
            type="password"
            placeholder="Enter your password...."
            error={validateError ? validateError.password : ""}
          />

          <Button_2 type="submit" className="w-64 my-3">
            Sumbit Login Info
          </Button_2>

          <Link className="my-1" href="/auth/forget-password">
            Forget Password!! Click here
          </Link>

          <div className="divider text-inherit">OR</div>
          <div className="flex justify-center align-middle">
            <div
              style={{ background: "black" }}
              className="my-3 px-0 h-12 w-12  rounded-full mx-2 flex align-middle justify-center items-center"
            >
              <BsGoogle className="h-6 w-6 fill-white" />
            </div>
            <div
              style={{ background: "black" }}
              className="my-3 px-0 h-12 w-12 rounded-full mx-2 flex align-middle justify-center items-center"
            >
              <VscGithubInverted className="h-6 w-6 fill-white" />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
