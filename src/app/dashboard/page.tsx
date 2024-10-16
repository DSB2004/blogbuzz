"use client";
import React from "react";
import TrendingCard from "../_components/trendingCard/card_1";
import EventCard from "../_components/eventCard";
import Card from "../_components/cards";
export default function Page() {
  return (
    <>
      <TrendingCard />

      <div className="my-5 w-full ">
        <h1 className="text-3xl font-bold text-center uppercase">
          Lastest Highlights
        </h1>
        <div className="my-5 grid gap-2 lg:gap-8 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 place-items-center">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>

      <div className="my-5 w-full ">
        <h1 className="text-3xl font-bold text-center uppercase">
          Upcoming Event
        </h1>
        <div className="my-5 grid gap-2 lg:gap-8 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 place-items-center">
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
        </div>
      </div>
    </>
  );
}
