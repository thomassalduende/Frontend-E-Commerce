'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CountCartContextProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountCartContext = createContext<CountCartContextProps | undefined>(undefined);

interface CountCartProviderProps {
    children: ReactNode;
}

export function CountCartProvider({ children }: CountCartProviderProps): JSX.Element {
    const [count, setCount] = useState<number>(1);

    return (
        <CountCartContext.Provider value={{ count, setCount }}>
            {children}
        </CountCartContext.Provider>
    );
}

export function useCartCount(): CountCartContextProps {
    const context = useContext(CountCartContext);
    if (!context) {
        throw new Error('useCartCount must be used within a CountCartProvider');
    }
    return context;
}
