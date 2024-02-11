import React, { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
    signedIn: boolean
    singin(accessToken: string): void
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storageAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

        return !!storageAccessToken;
    })

    const singin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

        localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

        setSignedIn(true);
    },[])
    return (
        <AuthContext.Provider value={{ signedIn, singin }}>
            {children}
        </AuthContext.Provider>
    )
}