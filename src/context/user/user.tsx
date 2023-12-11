'use client';
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface UserContextProps {
    isAuth: boolean | null;
    token: string | null;
    activateAuth: (newToken: string) => void;
    removeAuth: () => void;
}

const userContext = createContext<UserContextProps>({
    isAuth: null,
    token: null,
    activateAuth: () => { },
    removeAuth: () => { },
});

interface ProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: ProviderProps) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = window.sessionStorage.getItem('token');
        if (storedToken) {
            setIsAuth(true);
            setToken(storedToken);
        } else {
            setIsAuth(false);
            setToken(null);
        }
    }, []);

    const handleActivateAuth = (newToken: string) => {
        setIsAuth(true);
        setToken(newToken);
        window.sessionStorage.setItem('token', newToken);
    };

    const handleremoveAuth = () => {
        setIsAuth(false);
        setToken(null);
        window.sessionStorage.removeItem('token');
    }

    const value: UserContextProps = {
        isAuth,
        token, // Aquí se agrega el token al contexto
        activateAuth: handleActivateAuth,
        removeAuth: handleremoveAuth
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext)
};

