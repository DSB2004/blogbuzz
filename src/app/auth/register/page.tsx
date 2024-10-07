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
    <title>Register with BlogBuzz</title>
    <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

      <form
        style={{ boxShadow: "10px 10px 0px  black" }}
        onSubmit={handleLogin}
        className="bg-white h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
        <h1 className=" my-5 mb-8 text-3xl font-bold text-center uppercase">Register With BlogBuzz</h1>


        <Input_1 name="register-email" type="text" placeholder="Enter your email...." />

        <Input_1 name="register-password" type="password" placeholder="Enter your password...." />


        <div className="my-5">
          <Button_1 type="button" className="w-64 ">
            <FcGoogle className=" mr-2 w-6 h-6" />
            SignUp with Google
          </Button_1>
        </div>

        <Button_1 type="submit" className="w-64">Sumbit Account Info</Button_1>


      </form>
    </main >
  </>)
}
