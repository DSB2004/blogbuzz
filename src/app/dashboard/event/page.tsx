"use client";
import React from "react";
import EventCard from "@/app/_components/eventCard";
import TagInput from "@/app/_components/input/taginput";
export default function page() {
  return (
    <div className="w-full ">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-3 uppercase">
        Upcoming Events
      </h1>
      <TagInput name="search-tag"/>
      <div className="my-5 grid gap-2 lg:gap-8 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 place-items-center">
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
      </div>
    </div>
  );
}
