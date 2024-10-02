import React, { AnchorHTMLAttributes, FC, ReactNode } from "react";
import Link from "next/link";
interface IPROPS extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string
}

const NavList: FC<IPROPS> = ({ children, href }) => {
  return (
    <>
      <Link href={href} className="font-bold text-sm mx-4">{children}</Link>
    </>
  );
};

export default NavList;
