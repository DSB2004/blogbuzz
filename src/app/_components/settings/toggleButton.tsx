"use client";
import { ButtonHTMLAttributes, FC, useState, MouseEvent } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ToggleButton: FC<IPROPS> = ({ onClick, ...props }) => {
  const [isActive, toggleActive] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    toggleActive((prev) => !prev);
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="w-16 h-7 border-2 border-black duration-300 dark:border-white border-opacity-25 rounded-md flex items-center"
      {...props}
    >
      <div
        className={`w-5 h-5 mx-0.5 rounded-sm bg-black  dark:bg-white transition-all duration-300 ${
          isActive ? "translate-x-9" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
