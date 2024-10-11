"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import Button_2 from "@/app/_components/button/button_2";
import Input_1 from "@/app/_components/input/input_1";
import OTPAction from "./actions";
import { useError } from "@/app/_context/useError.context";
import Button_1 from "@/app/_components/button/button_1";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const { showError } = useError();
  const [state, action] = useFormState(OTPAction, null);

  useEffect(() => {
    if (state && state !== null) {
      showError(state.type, state.msg);
    }
  }, [state]);

  const ResendOtpHandler = async () => {
    try {
      const res = await fetch("/api/resend-otp");
      console.log(res.status);
      if (res.ok) {
        showError("SUCCESS", `OTP resend to your mail`);
      } else if (res.status === 403) {
        router.replace("/auth/login?error=SESSION_EXPIRED");
      } else {
        showError("ERROR", `Unavailable to resend OTP`);
      }
    } catch (err) {
      console.log(err);
      showError("ERROR", `Unavailable to resend OTP`);
    }
  };

  return (
    <>
      <title>OTP Verification</title>
      <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">
        <form
          style={{ boxShadow: "10px 10px 0px  black" }}
          action={action}
          className="bg-white min-h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto"
        >
          <h1 className=" my-5 mb-6 text-3xl font-bold text-center uppercase">
            Verify your email
          </h1>
          <p className="text-md mb-2">OTP has been send to your mail</p>
          <Input_1
            name="otp"
            type="text"
            placeholder="Enter your OTP...."
            className="my-4"
          />

          <Button_2 type="submit" className=" my-4 w-64">
            Sumbit OTP
          </Button_2>

          <Button_1
            type="button"
            className=" mt-2 w-64"
            onClick={() => ResendOtpHandler()}
          >
            Resend OTP
          </Button_1>
        </form>
      </main>
    </>
  );
}
