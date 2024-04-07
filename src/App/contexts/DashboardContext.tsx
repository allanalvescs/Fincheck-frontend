import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface DashboardContextValue {
    areValuesVisible: boolean;
    toggleVisibilityValues(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider ({ children }: {children: React.ReactNode}) {
    const [areValuesVisible, setValuesVisible] = useState(() => {
        const storageVisibleValues = localStorage.getItem(localStorageKeys.VISIBLE_VALUES);

        return storageVisibleValues === 'true';
    });

    const toggleVisibilityValues = useCallback(() => {
        setValuesVisible((prevState) => {
            localStorage.setItem(localStorageKeys.VISIBLE_VALUES, JSON.stringify(!prevState));
            
            console.log({current: localStorage.getItem(localStorageKeys.VISIBLE_VALUES) === 'true'});
            return localStorage.getItem(localStorageKeys.VISIBLE_VALUES) === 'true';
        });

    }, []);


   return (
        <DashboardContext.Provider value={{
            areValuesVisible,
            toggleVisibilityValues
        }}>
            {children}
        </DashboardContext.Provider>
   )
}