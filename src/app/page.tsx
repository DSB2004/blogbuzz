"use client"
import NavBar from "./_components/header/navBar";
import NavList from "./_components/header/navList";
import Button_1 from "./_components/button/button_1";
import AppInfo from "@/assets/static/app.info.json"
import Footer from "./_components/footer/footer";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import UIDesign from "@/assets/svg/UI design.svg"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  return (
    <>
      <Image src={UIDesign} alt="ui design" className="z-0 absolute top-0 right-0 transform translate-x-56" />

      {/* header */}
      <NavBar>
        <NavList href="/">Home</NavList>
        <NavList href="/">About</NavList>
        <NavList href="/auth/login">Login</NavList>
      </NavBar>

      {/* hero component */}

      <section className="relative p-10 mt-24 min-w-96 m-auto z-10">
        <div className="w-5/6 min-w-96">
          <h1 className="text-6xl font-extrabold text-shadow-sm w-1/2">
            Where Voices Echo, Ideas Thrive
          </h1>

          <h1 className="text-2xl font-semibold my-5 w-3/5">
            Discover, Create, and Share Your Unique Perspective with the World. A
            Place for Thoughtful Conversations, Creative Expressions, and
            Inspiring Stories.
          </h1>
          <Button_1 onClick={() => { router.push("/auth/register") }}>
            Let's Go
            <FaAngleRight className="ml-1" />
          </Button_1>
        </div>


      </section >


      {/* about component */}
      < section className="relative p-10 mt-20  min-w-96 z-10  m-auto" >
        <h1 className="text-4xl font-extrabold text-shadow-sm w-1/2">
          About the Platform
        </h1>

        <h1 className="text-xl font-bold my-5">
          BlogBuzz is an open, accessible blogging platform designed to give everyone the chance to express their opinions, share stories, and connect with a global audience. Whether you're a seasoned writer or just starting out, BlogBuzz offers the tools and freedom you need to create and share content without limitations.
          <br />
          <br />
          We believe that knowledge and expression shouldn’t be locked behind paywalls or restricted by censorship. Our mission is to provide a space where ideas can flow freely, opinions can be discussed openly, and readers have unrestricted access to diverse content.
        </h1>
        <div className="flex justify-end align-middle">
          <Button_1 >
            <Link href={AppInfo.github} target="blank">
              View Github
            </Link>
          </Button_1>
        </div>
      </section >

      {/* footer */}
      <Footer>
      </Footer >



    </>
  );
}
