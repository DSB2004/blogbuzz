import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button_1: FC<IPROPS> = ({ children, ...props }) => {
  return (
    <button
      style={{ background: "#FFE9AB" }}
      className="px-6 text-sm flex justify-evenly py-2 shadow-lg font-bold rounded-3xl"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button_1;
