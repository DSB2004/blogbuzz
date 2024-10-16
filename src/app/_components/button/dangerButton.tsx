import React, { FC, ButtonHTMLAttributes } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DangerButton: FC<IPROPS> = ({ children, className, ...props }) => {
  return (
    <button
      className={`uppercase px-6  text-white text-md bg-red-500  flex items-center justify-center align-middle py-1 active:animate-pulse shadow-md font-semibold hover:shadow-sm transition-all duration-200  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default DangerButton;
