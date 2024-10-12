"use client";
import NavBar from "./_components/header/navBar";
import NavList from "./_components/header/navList";
import Button_1 from "./_components/button/button_1";
import AppInfo from "@/assets/static/app.info.json";
import Footer from "./_components/footer/footer";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import Button_3 from "./_components/button/button_3";

import { useRouter } from "next/navigation";
import NavClick from "./_components/header/navClick";
export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* header */}
      <NavBar>
        <NavClick onClick={() => {}}>Home</NavClick>
        <NavClick onClick={() => {}}>About</NavClick>
        <Button_3
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login
        </Button_3>
      </NavBar>

      {/* hero component */}

      <section className="relative p-10 mt-24 min-w-96 m-auto z-10">
        <div className="w-5/6 min-w-96">
          <h1 className="text-7xl font-bold text-shadow-sm w-1/2 uppercase">
            Where Voices Echo, Ideas Thrive
          </h1>

          <h1 className="text-3xl font-medium my-5 w-3/5">
            Discover, Create, and Share Your Unique Perspective with the World.
            A Place for Thoughtful Conversations, Creative Expressions, and
            Inspiring Stories.
          </h1>
          <Button_1
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Let's Go
            <FaAngleRight className="w-6 h-6" />
          </Button_1>
        </div>
      </section>

      {/* about component */}
      <section className="relative p-10 mt-20  min-w-96 z-10  m-auto">
        <h1 className="text-5xl font-extrabold text-shadow-sm w-1/2 uppercase">
          About the Platform
        </h1>

        <h1 className="text-2xl font-medium my-5">
          BlogBuzz is an open, accessible blogging platform designed to give
          everyone the chance to express their opinions, share stories, and
          connect with a global audience. Whether you're a seasoned writer or
          just starting out, BlogBuzz offers the tools and freedom you need to
          create and share content without limitations.
          <br />
          <br />
          We believe that knowledge and expression shouldn’t be locked behind
          paywalls or restricted by censorship. Our mission is to provide a
          space where ideas can flow freely, opinions can be discussed openly,
          and readers have unrestricted access to diverse content.
        </h1>
        <div className="flex justify-end align-middle">
          <Button_1>
            <Link href={AppInfo.github} target="blank">
              View Github
            </Link>
          </Button_1>
        </div>
      </section>

      {/* footer */}
      <Footer></Footer>
    </>
  );
}
