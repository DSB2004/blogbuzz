import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Mail from "@/assets/svg/skill-icons_gmail-light.svg"
import Linkedin from "@/assets/svg/devicon_linkedin.svg"
import Portfolio from "@/assets/svg/flat-color-icons_about.svg"
import Github from "@/assets/svg/github icon.svg"
import DevInfo from "@/assets/static/dev.info.json"
export default function DevSection() {
    return (
        <div className="w-96 m-2 flex align-middle flex-col">
            <h1 className='text-xl text-center font-extrabold'>About the Developer</h1>
            <div className=' m-3 flex justify-center'>
                <Link href={DevInfo.github} target='blank'>
                    <Image src={Github} alt="github logo" className='m-3 h-8 w-8' />
                </Link>
                <Link href={DevInfo.linkedin} target='blank'>
                    <Image src={Linkedin} alt="linkedin logo" className='m-3 h-8 w-8' />
                </Link>
                <Link href={DevInfo.website} target='blank'>
                    <Image src={Portfolio} alt="portfolio logo" className='m-3 h-8 w-8' />
                </Link>
            </div>
        </div >
    )
}
