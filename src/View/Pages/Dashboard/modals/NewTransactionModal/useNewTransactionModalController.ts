import { z } from "zod";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBankAccounts } from "../../../../../App/hooks/useBankAccounts";
import { useCategories } from "../../../../../App/hooks/useCategories";
import { useMemo } from "react";
import { transactionsService } from "../../../../../App/services/transactionsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../App/Utils/currencyStringToNumber";

const schema = z.object({
    value: z.union([
        z.string().min(1, "Informe o valor"),
        z.number()
    ]),
    name: z.string().min(1, "Informe o nome"),
    categoryId: z.string().min(1, "Selecione uma categoria"),
    bankAccountId: z.string().min(1, "Selecione uma conta"),
    date: z.date({ required_error: "Informe a data" })
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
    const {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType
    } = useDashboard();

    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
        control,
        reset
    } = useForm<FormData>({ 
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    
    const { categories: categoriesList } = useCategories();
    const { accounts } = useBankAccounts();
    const { isLoading, mutateAsync } = useMutation(transactionsService.create);


    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                value: currencyStringToNumber(data.value),
                type: newTransactionType!,
                date: data.date.toISOString()
            });

            queryClient.invalidateQueries(["transactions"]);
            toast.success("Transação criada com sucesso!");
            reset();
            closeNewTransactionModal();
        } catch(err) {
            toast.error("Erro ao criar transação.")
        }
    });


    const categories = useMemo(() => {
        return categoriesList.filter(category => category.type === newTransactionType);
    }, [categoriesList, newTransactionType]);

    return {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType,
        register,
        errors,
        control,
        handleSubmit,
        accounts,
        categories,
        isLoading
    }
}