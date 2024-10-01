import NavBar from "./_components/header/navBar";
import NavList from "./_components/header/navList";
import Button_1 from "./_components/button/button_1";
import React from "react";
export default function Home() {
  return (
    <>
      {/* header */}
      <NavBar>
        <NavList>Home</NavList>
        <NavList>About</NavList>
        <NavList>Explore</NavList>
      </NavBar>

      {/* hero component */}

      <section className="w-full lg:w-5/6 m-auto border-2  p-10 my-32">
        <h1 className="text-4xl xl:text-5xl font-extrabold text-shadow w-1/2">
          Where Voices Echo, Ideas Thrive
        </h1>

        <h1 className="text-xl my-5 w-2/3">
          Discover, Create, and Share Your Unique Perspective with the World. A
          Place for Thoughtful Conversations, Creative Expressions, and
          Inspiring Stories.
        </h1>
        <Button_1>
          Let's Go
          </Button_1>
      </section>
    </>
  );
}
