import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button_2: FC<IPROPS> = ({ children, ...props }) => {
    return (
        <button
            style={{ background: "#FFE9AB" }}
            className="px-6 text-base flex justify-evenly py-2 shadow-lg font-normal "
            {...props}
        >
            {children}
        </button>
    );
};

export default Button_2;
