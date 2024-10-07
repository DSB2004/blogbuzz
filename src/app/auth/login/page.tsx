"use client"
import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import Button_1 from "@/app/_components/button/button_1";
import Input_1 from "@/app/_components/input/input_1";
import { useError } from "../../_context/useError.context"
export default function page() {
  const { showError } = useError();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const email = formData.get("login-email");
    const password = formData.get("login-password");


    try {

      let res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });


      if (!res.ok) {
        res = await res.json()
        console.log(res)
        showError('ERROR', "Login Unsuccessful")
      }



    }
    catch (err) {
      console.log(err)
    }


  }
  return (<>
    <title>Login with BlogBuzz</title>
    <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

      <form
        style={{ boxShadow: "10px 10px 0px  black" }}
        onSubmit={handleLogin}
        className="bg-white h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
        <h1 className=" my-5 mb-8 text-3xl font-bold text-center uppercase">Login With BlogBuzz</h1>


        <Input_1 name="login-email" type="text" placeholder="Enter your email...." />
        <Input_1 name="login-password" type="password" placeholder="Enter your password...." />


        <div className="my-5">
          <Button_1 type="button" className="w-64 ">
            <FcGoogle className=" mr-2 w-6 h-6" />
            SignIn with Google
          </Button_1>
        </div>

        <Button_1 type="submit" className="w-64">Sumbit Login Info</Button_1>


      </form>
    </main >
  </>)
}
