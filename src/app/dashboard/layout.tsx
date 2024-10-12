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
        <></>
      </NavBar>
      <div
        style={{ height: "90vh", width: "95vw" }} // Set a fixed width for the outer div
        className="flex justify-between mx-auto bg-white shadow-lg  min-w-96 rounded-lg flex-col-reverse md:flex-row "
      >
        <DashboardNavbar />
        {children}
      </div>
    </>
  );
}
