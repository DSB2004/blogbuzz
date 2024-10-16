import React from "react";
import TrendingCard from "@/app/_components/trendingCard/card_1";
import TagInput from "@/app/_components/input/taginput";
export default function page() {
  return (
    <div className="w-full ">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-3 uppercase">
        Trending Topics
      </h1>
      <TagInput />
      <div className="my-5  gap-5 flex flex-col">
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
      </div>
    </div>
  );
}
