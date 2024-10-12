import React from "react";
import { IoMdHeart } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
export default function Card() {
  return (
    <>
      <div
        style={{ height: "420px" }}
        className="
        my-2
        w-full
       border-black border-2 border-opacity-10
       relative"
      >
        <div className="absolute flex gap-1 top-2 right-2">
          <div className="p-0.5 px-1.5 opacity-50 rounded-md uppercase bg-black text-white">
            Tag 1
          </div>
          <div className="p-0.5 px-1.5 opacity-50 rounded-md uppercase bg-black text-white">
            Tag 2
          </div>
        </div>
        <div className="skeleton h-56 w-full rounded-none"> </div>
        <div className="m-2 mt-6 h-2 rounded-none skeleton "></div>
        <div className="m-2 rounded-none h-2 skeleton "></div>
        <div className="m-2 rounded-none  h-2 skeleton "></div>
        <div className="m-2 rounded-none h-2 skeleton w-1/2 "></div>
        
        <div className=" mt-16 mr-5 flex justify-end gap-3 items-center">
          <IoMdHeart className="w-6 h-6 opacity-50" />
          <IoBookmark className="w-6 h-6 opacity-50" />
        </div>
      </div>
    </>
  );
}
