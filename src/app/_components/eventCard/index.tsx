import React from "react";
export default function EventCard() {
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
        <div className="m-2 mt-6 h-4 rounded-none skeleton "></div>
        <div className="m-2 rounded-none h-4 skeleton w-1/2 "></div>
        <div className="m-4 mt-8 text-xl skeleton w-24 p-1 text-center text-white rounded-none">
          Join Event
        </div>
      </div>
    </>
  );
}
