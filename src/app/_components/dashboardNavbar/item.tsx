import React, { FC, ReactNode } from "react";
interface IPROPS {
  children: ReactNode; // This allows any valid React nodes to be passed as children
  dropdown?: ReactNode;
  className?: string;
  onClick?: Function;
}

const Item: FC<IPROPS> = ({ children, dropdown, className, onClick }) => {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`relative cursor-pointer flex  flex-col justify-start my-2 font-medium text-xl  ml-5 mr-3 transition-all duration-300 hover:bg-slate-100 rounded-lg  p-2 text-black ${className}`}
    >
      <div className="flex justify-start uppercase items-center gap-2 w-full font-semibold">
        {children}
      </div>
      {dropdown}
    </div>
  );
};

export default Item;
