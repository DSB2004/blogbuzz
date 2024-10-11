import React from "react";

import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex h-screen justify-center items-center flex-col">
        <h1 className="my-1 text-3xl font-extrabold text-center">
          Oops, this page doesn't exist
        </h1>
        <Link href="/" className="text-lg">
          Click here to go back to home page
        </Link>
      </div>
    </>
  );
}
