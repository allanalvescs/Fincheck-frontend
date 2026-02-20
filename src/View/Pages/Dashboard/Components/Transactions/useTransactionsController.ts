import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();

    return { 
        areValuesVisible,
        isInitialLoading: false,
        isLoading: false,
        transactions: []
    };
}