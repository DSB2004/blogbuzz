'use client';
import React, { ReactNode, useState, useEffect, FC } from 'react';



const Alert = () => {
    const [alertState, setAlertState] = useState<{ background: string, icon: ReactNode, msg: string } | null>(null);

  
    return (

        <div
            className={`fixed z-50  top-3 right-3 animate-slider shadow-2xl  ${alertState?.background}`}>
            <div className={`p-3 min-w-80  `}>
                <p className='text-sm font-normal text-white flex gap-1 items-center'>
                    {alertState?.icon}
                    {alertState?.msg}
                </p>
            </div>
        </div >
    );
}

export default Alert;