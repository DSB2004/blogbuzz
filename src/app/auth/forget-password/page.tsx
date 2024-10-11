"use client"
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Button_2 from "@/app/_components/button/button_2";
import Input_1 from "@/app/_components/input/input_1";
import { useError } from "../../_context/useError.context"
import ForgetPasswordAction from "./actions";

export default function page() {

  const { showError } = useError();
  const [validateError, setError] = useState<
    { email: string | undefined } | null>(null)
  const [state, action] = useFormState(ForgetPasswordAction, null);


  useEffect(() => {
    console.log(state)
    setError(null);
    // error loop
    if (state) {
      if (state.type === 'VALIDATION' && typeof state.msg !== 'string') {
        setError(state.msg)
      }
      else if (typeof state.msg === 'string') {
        showError(state.type, state.msg)
      }
    }
  }, [state])


  return (<>


    <title>Login</title>
    <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

      <form
        action={action}
        style={{ boxShadow: "10px 10px 0px  black" }}
        className="bg-white min-h-80 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
        <h1 className=" my-5 mb-8 text-3xl font-bold text-center uppercase">Forget Password</h1>
        <p className="text-sm text-center">Enter your blogbuzz account email for password recovery</p>
        <Input_1 name="registered-email" type="text" placeholder="Enter your email...." error={validateError ? validateError.email : ""} />

        <Button_2 type="submit" className="w-64">Sumbit Email</Button_2>

      </form>
    </main >
  </>)
}
