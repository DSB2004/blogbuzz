import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button_1: FC<IPROPS> = ({ children, ...props }) => {
  return (
    <button
      style={{ background: "#FFE9AB" }}
      className="px-6 text-md flex justify-evenly align-middle items-center py-2 shadow-lg font-bold rounded-2xl"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button_1;
