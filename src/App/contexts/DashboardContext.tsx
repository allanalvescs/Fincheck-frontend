import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { BankAccount } from "../entities/BankAccount";

interface DashboardContextValue {
    areValuesVisible: boolean;
    toggleVisibilityValues(): void;
    isNewAccountModalOpen: boolean;
    openNewAccountModal(): void;
    closeNewAccountModal(): void;
    isNewTransactionModalOpen: boolean;
    openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
    closeNewTransactionModal(): void;
    newTransactionType: "INCOME" | "EXPENSE" | null;
    isEditAccountModalOpen: boolean;
    openEditAccountModal(bankAccount: BankAccount): void;
    closeEditAccountModal(): void;
    accountBeingEdited: BankAccount | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: {children: React.ReactNode}) {
    const [areValuesVisible, setValuesVisible] = useState(() => {
        const storageVisibleValues = localStorage.getItem(localStorageKeys.VISIBLE_VALUES);

        return storageVisibleValues === 'true';
    });
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null);
    
    const toggleVisibilityValues = useCallback(() => {
        setValuesVisible((prevState) => {
            localStorage.setItem(localStorageKeys.VISIBLE_VALUES, JSON.stringify(!prevState));

            console.log({current: localStorage.getItem(localStorageKeys.VISIBLE_VALUES) === 'true'});
            return localStorage.getItem(localStorageKeys.VISIBLE_VALUES) === 'true';
        }); 

    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

     const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
        setAccountBeingEdited(bankAccount);
        setIsEditAccountModalOpen(true);
    }, []);

    const closeEditAccountModal = useCallback(() => {
        setIsEditAccountModalOpen(false);
        setAccountBeingEdited(null);
    }, []);


    const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
        setNewTransactionType(type);   
        setIsNewTransactionModalOpen(true);
    }, []);

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);


    return (
        <DashboardContext.Provider value={{ 
                areValuesVisible, 
                toggleVisibilityValues,
                isNewAccountModalOpen,
                openNewAccountModal,
                closeNewAccountModal,
                isNewTransactionModalOpen,
                openNewTransactionModal,
                closeNewTransactionModal,
                newTransactionType,
                isEditAccountModalOpen,
                openEditAccountModal,
                closeEditAccountModal,
                accountBeingEdited
            }}>
            {children}
        </DashboardContext.Provider>
    )
}