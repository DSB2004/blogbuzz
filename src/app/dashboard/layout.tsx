import type { Metadata } from "next";
import DashboardNavbar from "../_components/dashboardNavbar";

import NavBar from "../_components/header/navBar";
export const metadata: Metadata = {
  title: "BlogBuzz",
  description: "A typescript based blogging site",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar>
        <DashboardNavbar />
      </NavBar>

      <div style={{ maxWidth: "1500px" }} className="w-11/12 mx-auto ">
        {children}
      </div>
    </>
  );
}
