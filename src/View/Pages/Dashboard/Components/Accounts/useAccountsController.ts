import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../App/hooks/useWindowWidth";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountServices } from "../../../../../App/services/bankAccountServices";

export function useAccountsController() {
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false
    });

    const windowWidth = useWindowWidth();
    const { areValuesVisible, toggleVisibilityValues, openNewAccountModal } = useDashboard();

    const { data, isLoading } = useQuery({
        queryKey: ["bankAccounts"],
        queryFn: bankAccountServices.getAll,
    });

    const currentBalance = useMemo(() => {
        if (!data) return 0;

        return data.reduce((acc, account) => acc + account.currentBalance, 0);
    }, [data])

    return {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibilityValues,
        openNewAccountModal,
        isLoading: isLoading,
        accounts: data ?? [],
        currentBalance
    }
}