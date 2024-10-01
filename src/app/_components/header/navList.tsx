import React, { FC, ReactNode } from "react";

interface IPROPS {
  children: ReactNode;
}

const NavList: FC<IPROPS> = ({ children }) => {
  return (
    <>
      <li className="font-bold text-xs mx-4">{children}</li>
    </>
  );
};

export default NavList;
