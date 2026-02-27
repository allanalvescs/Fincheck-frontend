import { useEffect, useState } from "react";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { useTransactions } from "../../../../../App/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../App/services/transactionsService/getAll";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();

    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [filters, setFilters] = useState<TransactionsFilters>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const {
        transactions,
        isLoading,
        isInitialLoading,
        refetchTransactions
    } = useTransactions(filters);

    useEffect(() => {
        refetchTransactions();
    }, [filters, refetchTransactions]);

    function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
        return (value: TransactionsFilters[TFilter]) => {
            if (value === filters[filter]) return;

            setFilters((prev) => ({
                ...prev,
                [filter]: value
            }));
        }
    }

    function handleApplyFilters({ bankAccountId, year }: { bankAccountId: string | undefined; year: number }) {
        handleChangeFilters("bankAccountId")(bankAccountId);
        handleChangeFilters("year")(year);
        handleCloseFiltersModal();
    }

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false);
    }


    return { 
        areValuesVisible,
        isInitialLoading,
        isLoading,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        isFiltersModalOpen,
        transactions,
        handleChangeFilters,
        filters,
        handleApplyFilters
    };
}