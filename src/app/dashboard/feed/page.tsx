"use client";
import TagInput from "@/app/_components/input/taginput";
import React from "react";
import Card from "@/app/_components/cards";
import { IoSearchOutline } from "react-icons/io5";
export default function page() {
  return (
    <>
      <div className="w-full my-0 ">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-3 uppercase">
          Lastest Highlights
        </h1>
        <TagInput name="search-tag" />
        <div className="my-5 grid gap-2 lg:gap-8 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 place-items-center">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
}
