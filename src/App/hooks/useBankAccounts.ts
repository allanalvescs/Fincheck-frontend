import { useQuery } from "@tanstack/react-query";
import { bankAccountServices } from "../services/bankAccountServices";

export function useBankAccounts() {
    const { data, isLoading } = useQuery({
        queryKey: ["bankAccounts"],
        queryFn: bankAccountServices.getAll,
    });

    return { accounts: data ?? [], isLoading }

}