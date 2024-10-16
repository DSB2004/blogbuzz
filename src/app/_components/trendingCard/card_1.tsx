import React from "react";

export default function TrendingCard() {
  return (
    <div
      style={{ height: "420px" }}
      className="w-full skeleton rounded-none relative"
    >
      <div className="w-10/12  sm:w-72  md:w-1/2  absolute bottom-10 left-5  md:left-10 text-white">
        <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold my-2 uppercase">
          Trending
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          corporis iste sed illum deserunt ullam similique obcaecati quibusdam
          maxime reprehenderit
        </p>
      </div>
    </div>
  );
}
