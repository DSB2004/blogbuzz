"use client"
import React, { useState, useEffect } from 'react'
import Button_2 from '@/app/_components/button/button_2'
import RegisterAction from './actions';
import { useError } from '@/app/_context/useError.context';
import { useFormState } from 'react-dom';
export default function page() {
    const { showError } = useError();

    const [state, action] = useFormState(RegisterAction, null);

    const [validateError, setError] = useState<
        { email: string | undefined, password: string | undefined } | null>(null)

    useEffect(() => {
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

    return (
        <>
            <title>SignUp</title>
            <main className="fixed top-0 min-h-svh flex items-center justify-center w-full">

                <form
                    style={{ boxShadow: "10px 10px 0px  black" }}
                    action={action}
                    className="bg-white min-h-96 flex flex-col items-center w-3/12 p-3 min-w-80 my-auto" >
                    <h1 className=" my-5 mb-8 text-3xl font-bold text-center uppercase">New Account</h1>

                    <p className='text-center text-md my-3'>By creating an account, your email and password will be securely stored on our server. Any blogs or content you post will be visible to all users on the platform. Please ensure your posts adhere to our community guidelines</p>

                    <div className='flex justify-between align-center my-4'>
                        <p className='font-semibold'>Agree to Term and Condition</p>
                        <input name="accept" type="checkbox" className="checkbox ml-2" />
                    </div>
                    <Button_2
                        type="submit"
                        className="w-64">
                        Create New Account
                    </Button_2>

                </form>
            </main >
        </>)

}
