import React, { FC, InputHTMLAttributes, useState } from "react";

import { FaEyeSlash } from "react-icons/fa";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input_1: FC<IPROPS> = ({ className, type = "text", error, ...props }) => {
  const [currentType, setType] = useState<string>(type);

  const handleTypeChange = () => {
    if (currentType === "text") {
      setType("password");
    } else {
      setType("text");
    }
  };

  return (
    <div className="relative">
      <span className="text-red-600 text-left text-xs absolute r-0 top-0">
        {error}
      </span>
      <input
        className={`text-base p-1.5 my-3 outline-none min-w-72  border-b-2 border-black border-spacing-2 
                    border-opacity-0 hover:border-opacity-65 transition-all duration-500
              
                    ${className}`}
        type={currentType}
        {...props}
      />

      {type === "password" ? (
        <>
          <FaEyeSlash
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px",
            }}
            className=" w-4 h-4 fill-gray-600"
            onClick={handleTypeChange}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input_1;
