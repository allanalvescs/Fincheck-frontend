import React, { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import userServices from "../services/userServices ";
import toast from "react-hot-toast";
import { PageLoader } from "../../View/Pages/PageLoader";

interface AuthContextValue {
    signedIn: boolean
    singin(accessToken: string): void
    signout(): void
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storageAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

        return !!storageAccessToken;
    })

    const { isError, isFetching, isSuccess } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: () => userServices.me(),
        enabled: signedIn
    });

    const singin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        setSignedIn(true);
    },[]);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        setSignedIn(false);
    },[]);

    useEffect(() => {
        if (isError) {
            toast.error('Sua sessão expirou!')
            signout()
        }
    },[isError, signout])


    return (
        <AuthContext.Provider value={{
            signedIn: isSuccess && signedIn,
            singin,
            signout
        }}>
            <PageLoader isLoading={isFetching}/>
            {!isFetching && children}
        </AuthContext.Provider>
    )
}