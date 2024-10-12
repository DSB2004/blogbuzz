"use client";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdAddToPhotos } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function DashboardNavbar() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-evenly  p-4 align-middle items-center  flex-row md:flex-col">
        <MdOutlineDashboard
          className="w-8 h-8"
          onClick={() => router.push("/dashboard")}
        />
        <FaUserFriends
          className="w-8 h-8"
          onClick={() => router.push("/dashboard/user")}
        />

        <CiSearch
          className="w-8 h-8"
          onClick={() => router.push("/dashboard/blog")}
        />

        <MdAddToPhotos
          className="w-8 h-8"
          onClick={() => router.push("/dashboard/blog/create")}
        />
      </div>
    </>
  );
}
