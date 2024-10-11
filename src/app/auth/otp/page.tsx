"use client"
import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import Button_2 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
import OTPAction from "./actions";
import { useError } from "@/app/_context/useError.context";

export default function page() {

    const { showError } = useError()
    const [state, action] = useFormState(OTPAction, null);
    
    useEffect(() => {
        if (state && state !== null) {
            showError(state.type, state.msg)
        }
    }, [state])

    return (<>
        <title>OTP Verification</title>
        <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

            <form
                style={{ boxShadow: "10px 10px 0px  black" }}
                action={action}
                className="bg-white h-80 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
                <h1 className=" my-5 text-3xl font-bold text-center uppercase">Verify your email</h1>
                <p className="text-sm">An OTP has been send on your mail</p>
                <Input_1 name="otp" type="text" placeholder="Enter your OTP...." className="mb-5" />

                <Button_2 type="submit" className="w-64">Sumbit OTP</Button_2>


            </form>
        </main >
    </>)
}