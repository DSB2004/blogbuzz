"use client"
import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import Button_1 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
export default function page() {

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const email = formData.get("login-email");
        const password = formData.get("login-password");

        console.log("Email:", email);
        console.log("Password:", password);



    }
    return (<>
        <title>OTP Verification</title>
        <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

            <form
                style={{ boxShadow: "10px 10px 0px  black" }}
                onSubmit={handleLogin}
                className="bg-white h-80 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
                <h1 className=" my-5 text-3xl font-bold text-center uppercase">Verify your email</h1>
                <p className="text-sm">An OTP has been send on $useremail</p>
                <p className="text-sm mb-5">This OTP is only valid for $timelimit</p>
                <Input_1 name="verify-otp" type="text" placeholder="Enter your OTP...." className="mb-5" />

                <Button_1 type="submit" className="w-64">Sumbit OTP</Button_1>


            </form>
        </main >
    </>)
}