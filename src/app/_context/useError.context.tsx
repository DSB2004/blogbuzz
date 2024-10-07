"use client"
import React, { useContext, createContext, FC, ReactNode, useState, useEffect } from "react";
// import Alert from "../_components/alert/alert";
import { MdErrorOutline } from 'react-icons/md';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';


interface ErrorInfo {
    background: string;
    icon: ReactNode;
}

interface ErrorContextType {
    alertState: { background: string, icon: ReactNode, msg: string } | null
    showError: (type: string, msg: string) => void
}

const ErrorContext = createContext<ErrorContextType | null>(null)


const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const alertMap: { [key: string]: ErrorInfo } = {
        SUCCESS: {
            background: 'bg-green-600',
            icon: <IoCheckmarkDoneCircleSharp className='w-6 h-6' />,
        },
        ERROR: {
            background: 'bg-red-600',
            icon: <MdErrorOutline className='w-6 h-6' />,
        },
    };

    const [alertState, setAlertState] = useState<{ background: string, icon: ReactNode, msg: string } | null>(null);

    const showError = (type: string, msg: string) => {
        setAlertState({ ...alertMap[type], msg })
    }


    useEffect(() => {
        let errorInterval = null;
        if (alertState) {
            errorInterval = setTimeout(() => {
                setAlertState(null)
            }, 3500)
        }
        return () => {
            errorInterval ? clearTimeout(errorInterval) : null
        }
    }, [alertState])





    return (

        <>
            <ErrorContext.Provider value={{ alertState, showError }}>

                {
                    !alertState || alertState === null ?
                        <></> :
                        <>
                            <div
                                className={`fixed z-50  top-3 right-3 animate-slider shadow-2xl  ${alertState?.background}`}>
                                <div className={`p-3 min-w-80  `}>
                                    <p className='text-sm font-normal text-white flex gap-1 items-center'>
                                        {alertState?.icon}
                                        {alertState?.msg}
                                    </p>
                                </div>
                            </div >
                        </>

                }


                {children}
            </ErrorContext.Provider>
        </>
    )
}


export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within a ErrorProvider');
    }
    return context;
};

export default ErrorProvider;