"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdOutlineEmojiEvents } from "react-icons/md";
import Item from "./item";
import Icon from "@/assets/img/icon.png";
import Image from "next/image";
import { IoIosHome } from "react-icons/io";

import { MdOutlineCampaign, MdLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

export default function DashboardNavbar() {
  const router = useRouter();
  const [isOpen, toggleOpen] = useState<boolean>(false);
  return (
    <>
      <FiMenu
        className="w-6 h-6 md:w-8 md:h-8"
        onClick={() => toggleOpen(!isOpen)}
      />

      <div
        className={`fixed top-0 left-0 overflow-hidden h-full shadow-xl transition-all duration-500 ${
          isOpen ? "w-72" : "w-0"
        }`}
      >
        <nav
          className={`bg-grey-300 bg-white  duration-300 w-72 h-full z-50  relative
            
            `}
        >
          <div className="flex gap-2 py-3 px-3 items-center">
            <Image className="w-10 h-10" src={Icon} alt="blog-buzz"></Image>
            <h1 className="  font-bold text-xl uppercase">BlogBuzz</h1>
          </div>

          <div className="mt-10 flex flex-col">
            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard");
              }}
            >
              <IoIosHome className="w-6 h-6" />
              Home
            </Item>

            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard/feed");
              }}
            >
              <MdOutlineDashboard className="w-6 h-6" />
              Daily Feed
            </Item>

            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard/user");
              }}
            >
              <FaUserFriends className="w-6 h-6" />
              Users
            </Item>

            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard/event");
              }}
            >
              <MdOutlineEmojiEvents className="w-6 h-6" />
              Events
            </Item>

            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard/trending");
              }}
            >
              <MdOutlineCampaign className="w-6 h-6" />
              Trending
            </Item>

            <Item
              onClick={() => {
                toggleOpen(false);
                router.push("/dashboard/account");
              }}
            >
              <IoSettings className="w-6 h-6" />
              Manage Account
            </Item>
          </div>
          <div className="absolute bottom-5 w-full">
            <Item className="mt-auto">
              <MdLogout className="w-8 h-8 fill-red-500" />
              <span className="text-red-500 font-bold"> Logout</span>
            </Item>
          </div>
        </nav>
      </div>
    </>
  );
}
