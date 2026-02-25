import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function useNewTransactionModalController() {
    const {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType
    } = useDashboard();

    return {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType
    }
}