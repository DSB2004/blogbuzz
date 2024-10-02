import React from 'react'
import Image from 'next/image'
import Icon from "@/assets/img/icon.png"
export default function LogoTitle() {
    return (
        <div className='flex flex-col items-center align-middle justify-center'>
            <Image className="w-32 h-32" src={Icon} alt="logo"></Image>
            <h1 className="text-2xl text-center font-bold">BlogBuzz</h1>
        </div>
    )
}
