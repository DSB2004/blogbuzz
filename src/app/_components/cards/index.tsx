import React from "react";
export default function Card() {
  return (
    <>
      <div
        style={{ minHeight: "420px" }}
        className="
        m-2 

        w-full
       relative"
      >
        <div className="skeleton  h-60 sm:h-72 md:h-60  xl:h-72 w-full rounded-none">
          {" "}
        </div>
        <div className="m-2 mt-6 h-2 rounded-none skeleton "></div>
        <div className="m-2 rounded-none h-2 skeleton "></div>
        <div className="m-2 rounded-none  h-2 skeleton "></div>
        <div className="m-2 rounded-none h-2 skeleton w-1/2 "></div>

        <div className="m-2 mt-12 text-xl skeleton w-24 p-1 text-center text-white rounded-none">
          Know More
        </div>
      </div>
    </>
  );
}
