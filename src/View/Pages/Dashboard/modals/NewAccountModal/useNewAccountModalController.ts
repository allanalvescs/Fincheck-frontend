import { z } from "zod";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountServices } from "../../../../../App/services/bankAccountServices";
import { currencyStringToNumber } from "../../../../../App/Utils/currencyStringToNumber";

const schema = z.object({
    initialBalance: z.string().min(1, "O saldo inicial é obrigatório"),
    name: z.string().min(1, "O nome da conta é obrigatório"),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().min(1, "A cor da conta é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
    const {
        isNewAccountModalOpen,
        closeNewAccountModal
    } = useDashboard();

    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
        control,
        reset
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const queryClient = useQueryClient();
    const { isLoading, mutateAsync } = useMutation(bankAccountServices.create);

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance)
            });

            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("Conta cadastrada com sucesso!");
            closeNewAccountModal();
            reset();
        } catch {
            toast.error("Ocorreu um erro ao cadastrar a conta.");
        }
    })

    return {
        isNewAccountModalOpen,
        closeNewAccountModal,
        errors,
        register,
        handleSubmit,
        control,
        isLoading
    }
}