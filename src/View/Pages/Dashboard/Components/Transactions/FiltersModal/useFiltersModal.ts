import { useState } from "react";

export function useFiltersModal() {
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    function handleSelectBankAccount(bankAccountId: string) {
        setSelectedBankAccountId((prevState) => (
            prevState === bankAccountId ? null : bankAccountId
        ));
    }

    function handleChangeYear(step: number) {
        setSelectedYear((prevYear) => prevYear + step);
    }

    return {
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear
    };
}