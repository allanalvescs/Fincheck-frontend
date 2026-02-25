import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function useNewAccountModalController() {
    const {
        isNewAccountModalOpen,
        closeNewAccountModal
    } = useDashboard();

    return {
        isNewAccountModalOpen,
        closeNewAccountModal
    }
}