"use client"
import React, { useContext, createContext, FC, ReactNode, useState } from "react";
import Alert from "../_components/alert/alert";
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
    const errorMap: { [key: string]: ErrorInfo } = {
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
        setAlertState({ ...errorMap[type], msg })
    }

    return (

        <>
            <ErrorContext.Provider value={{ alertState, showError }}>
                <Alert />
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