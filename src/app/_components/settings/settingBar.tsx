import React, { FC, ReactNode } from "react";

interface IPROPS {
  children: ReactNode;
}
const SettingsBar: FC<IPROPS> = ({ children }) => {
  return (
    <>
      <div className="border-b-2 flex  justify-between items-center duration-300 p-2 mx-auto my-1 border-gray-500 border-opacity-20 w-11/12  text-lg font-semibold dark:text-white">
        {children}
      </div>
    </>
  );
};

export default SettingsBar;
