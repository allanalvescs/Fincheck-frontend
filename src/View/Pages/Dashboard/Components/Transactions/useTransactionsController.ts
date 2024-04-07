import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function useTransactionController () {
    const { areValuesVisible } = useDashboard();

    return {
        areValuesVisible,
        isInitialLoading: false,
        isLoading: false,
        transactios: [{}]
    }
}