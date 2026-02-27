import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../App/hooks/useWindowWidth";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountServices } from "../../../../../App/services/bankAccountServices";
import { useBankAccounts } from "../../../../../App/hooks/useBankAccounts";

export function useAccountsController() {
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false
    });

    const windowWidth = useWindowWidth();
    const { areValuesVisible, toggleVisibilityValues, openNewAccountModal } = useDashboard();

   const { accounts, isLoading } = useBankAccounts()

    const currentBalance = useMemo(() => {
        return accounts.reduce((acc, account) => acc + account.currentBalance, 0);
    }, [accounts])

    return {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibilityValues,
        openNewAccountModal,
        isLoading: isLoading,
        accounts,
        currentBalance
    }
}