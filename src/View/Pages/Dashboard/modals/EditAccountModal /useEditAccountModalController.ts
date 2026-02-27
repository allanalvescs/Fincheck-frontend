import { z } from "zod";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountServices } from "../../../../../App/services/bankAccountServices";
import { currencyStringToNumber } from "../../../../../App/Utils/currencyStringToNumber";
import { useState } from "react";

const schema = z.object({
    initialBalance: z.union([
        z.string().min(1, "O saldo inicial é obrigatório"),
        z.number()
    ]),
    name: z.string().min(1, "O nome da conta é obrigatório"),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().min(1, "A cor da conta é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
    const {
        isEditAccountModalOpen,
        closeEditAccountModal,
        accountBeingEdited
    } = useDashboard();

    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
        control
    } = useForm<FormData>({ 
        resolver: zodResolver(schema),
        defaultValues: {
            color: accountBeingEdited?.color,
            name: accountBeingEdited?.name,
            type: accountBeingEdited?.type,
            initialBalance: accountBeingEdited?.currentBalance
        } 
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const queryClient = useQueryClient();
    const { isLoading, mutateAsync: updateBankAccount } = useMutation(bankAccountServices.update);
    const { isLoading: isLoadingDelete, mutateAsync: removeAccount } = useMutation(bankAccountServices.remove);

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            await updateBankAccount({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
                id: accountBeingEdited!.id
            });

            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("A conta foi editada com sucesso!");
            closeEditAccountModal();
        } catch {
            toast.error("Erro ao salvar as alterações.");
        }
    });

    async function handleDeleteAccount(){
        try {
            await removeAccount(accountBeingEdited!.id);

            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("A conta foi deletada com sucesso!");
            closeEditAccountModal();
        } catch {
            toast.error("Erro ao deletar a conta.");
        }
    };

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
    }


    return {
        isEditAccountModalOpen,
        closeEditAccountModal,
        errors,
        register,
        handleSubmit,
        control,
        isLoading,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteAccount,
        isLoadingDelete
    }
}