"use client";

import { ReactNode, FC, useEffect, useState } from "react";
import Icon from "@/assets/img/icon.png";
import Image from "next/image";
interface IPROPS {
  children: ReactNode;
}

const NavBar: FC<IPROPS> = ({ children }) => {
  const [state, changeState] = useState<string>("");
  const onScroll = () => {
    if (window.scrollY > 50) {
      console.log("More then 50");
      changeState("shadow-lg bg-white");
    } else {
      changeState("");
      console.log("less then 50");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <nav
      className={` z-20 sticky flex justify-between items-center align-middle top-0 p-3 transition-all duration-500 ${state}`}
    >
      <div className="flex justify-between items-center align-middle w-fit">
        <Image
          className="w-8 h-8 md:w-10 md:h-10"
          src={Icon}
          alt="blog-buzz"
        ></Image>
        <h1 className=" ml-2 font-bold text-lg md:text-xl text-l uppercase">
          BlogBuzz
        </h1>
      </div>
      <div className="flex justify-evenly align-middle  items-center list-none w-fit">
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
