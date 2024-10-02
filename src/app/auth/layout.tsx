import React from "react";
import NavBar from "../_components/header/navBar";
import NavList from "../_components/header/navList";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar>
                <NavList href="/">Home</NavList>
                <NavList href="/auth/register">Register</NavList>
                <NavList href="/auth/login">Login</NavList>
            </NavBar>
            {children}
        </>
    );
}
