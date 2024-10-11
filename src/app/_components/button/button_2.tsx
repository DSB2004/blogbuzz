'use client'
import React, { FC, ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button_2: FC<IPROPS> = ({ children, className, ...props }) => {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            style={{ background: "#FFE9AB" }}
            className={`uppercase px-6 text-base flex  items-center justify-center align-middle py-2 shadow-lg font-semibold hover:shadow-sm transition-all duration-200 active:animate-pulse ${className}`
            }
            {...props}
        >
            {pending ? <><span className="loading loading-spinner loading-md"></span></> : <>{children}</>}

        </button>
    );
};

export default Button_2;
