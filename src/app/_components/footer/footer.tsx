import React from 'react'
import LogoTitle from './logoTitle'
import Disclamer from './disclamer'
import DevSection from './devSection'
export default function Footer() {
    return (
        <footer className="flex p-5 justify-evenly align-middle items-center" style={{ background: "#FFE9AB" }}>

            <LogoTitle />
            <Disclamer />
            <div className='h-36 w-0.5 rounded-lg bg-black'></div>
            <DevSection />



        </footer >
    )
}
