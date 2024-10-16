import React, { FC, InputHTMLAttributes, useState } from "react";

import { VscGithubInverted } from "react-icons/vsc";
import { ImLinkedin } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaMedium } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  defaultValue: string[];
}

const handleIcons = (link: string) => {
  if (link.toLowerCase().includes("google")) {
    return <FcGoogle className="h-6 w-6 " />;
  } else if (link.toLowerCase().includes("linkedin")) {
    return <ImLinkedin className="h-6 w-6 fill-blue-500" />;
  } else if (link.toLowerCase().includes("medium")) {
    return <FaMedium className="h-6 w-6 dark:fill-white" />;
  } else if (link.toLowerCase().includes("github")) {
    return <VscGithubInverted className="h-6 w-6  dark:fill-white " />;
  } else {
    return <FaGlobe className="h-6 w-6 " />;
  }
};

const IconInput: FC<IPROPS> = ({
  className,
  name,
  type = "text",
  error,
  defaultValue,
  ...props
}) => {
  const [values, updatevalues] = useState(defaultValue);
  return (
    <div className="relative flex gap-3 items-center justify-center align-middle flex-col-reverse md:flex-row">
      <span className="text-red-600 text-left text-xs absolute r-0 top-0">
        {error}
      </span>
      <div className="flex gap-2 justify-center align-middle">
        {values.map((ele) => handleIcons(ele))}
      </div>
      <input
        className={`text-base p-1.5 my-1 outline-none  bg-transparent border-b-2 border-black border-spacing-2 
                    border-opacity-65 
              
                    ${className}`}
        type="text"
        {...props}
      />
      <input type="hidden" name={name} value={JSON.stringify(values)} />
    </div>
  );
};
export default IconInput;
