import React, { FC, ReactNode } from "react";
import Link from "next/link";
interface IPROPS {
  children: ReactNode;
  onClick: Function;
}

const NavClick: FC<IPROPS> = ({ children, onClick }) => {
  return (
    <>
      <li onClick={() => onClick()} className=" font-medium text-lg mx-4">
        {children}
      </li>
    </>
  );
};

export default NavClick;
