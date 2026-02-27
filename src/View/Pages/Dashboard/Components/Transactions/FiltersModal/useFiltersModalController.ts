import { useState } from "react";
import { useBankAccounts } from "../../../../../../App/hooks/useBankAccounts";

export function useFiltersModalController() {
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const { accounts } = useBankAccounts();


    function handleSelectBankAccount(bankAccountId: string) {
        setSelectedBankAccountId((prevState) => (
            prevState === bankAccountId ? undefined : bankAccountId
        ));
    }

    function handleChangeYear(step: number) {
        setSelectedYear((prevYear) => prevYear + step);
    }

    return {
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear,
        accounts
    };
}