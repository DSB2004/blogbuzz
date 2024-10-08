import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button_1: FC<IPROPS> = ({ children, className, ...props }) => {
  return (
    <button
      style={{ background: "#FFE9AB" }}
      className={`uppercase px-6 text-base flex  items-center justify-center align-middle py-2 shadow-lg font-semibold hover:shadow-sm transition-all duration-200 active:animate-pulse ${className}`
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button_1;
