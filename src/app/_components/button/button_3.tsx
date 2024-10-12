import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button_3: FC<IPROPS> = ({ children, className, ...props }) => {
  return (
    <button
      style={{ background: "black" }}
      className={`uppercase px-6  text-white text-md  flex items-center justify-center align-middle py-1 active:animate-pulse shadow-md font-semibold hover:shadow-sm transition-all duration-200  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button_3;
