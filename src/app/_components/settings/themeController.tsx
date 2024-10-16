"use client";

import { useEffect, useState } from "react";
import { IoIosMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { isDark, toggleTheme } from "@/util/theme.util";

export default function ThemeController() {
  const [isdark, setDark] = useState<boolean>(false);

  useEffect(() => {
    setDark(isDark());
  }, []);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => {
        toggleTheme();
        setDark(!isdark);
      }}
    >
      {isdark ? (
        <IoIosMoon className="w-7 h-7 mr-4 dark:fill-white duration-300" />
      ) : (
        <MdSunny className="w-7 h-7 mr-4 duration-300" />
      )}
    </div>
  );
}
