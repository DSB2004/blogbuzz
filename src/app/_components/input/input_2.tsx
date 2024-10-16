import React, { FC, InputHTMLAttributes } from "react";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input_2: FC<IPROPS> = ({ className, error, ...props }) => {
  return (
    <div className="relative">
      <span className="text-red-600 text-left text-xs absolute r-0 top-0">
        {error}
      </span>
      <input
        className={`text-base p-1.5 my-1 outline-none  bg-transparent border-b-2 border-black border-spacing-2 
                    border-opacity-65 transition-all duration-500
              
                    ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input_2;
