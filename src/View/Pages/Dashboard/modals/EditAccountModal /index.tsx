import { Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { ColorsDropdownInput } from "../../../../Components/ColorsDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../Components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../Components/ConfirmDeleteModal";


export function EditAccountModal() {
    const { 
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
    } = useEditAccountModalController();

    if (isDeleteModalOpen) {
        return (
            <ConfirmDeleteModal
                onConfirm={handleDeleteAccount}
                onClose={handleCloseDeleteModal}
                title=" Tem certeza que deseja excluir essa conta ?"
                description=" Ao excluir a conta, também serão excluidos todos os registros de receita e despesas relacionados a ela."
                isLoading={isLoadingDelete}
            />
        )
    }

    return (
        <Modal 
            title="Editar Conta"
            open={isEditAccountModalOpen}
            onClose={closeEditAccountModal}
            rightSlot={(
                <button onClick={handleOpenDeleteModal}>
                    <TrashIcon className="w-6 h-6 text-red-500"/>
                </button>
            )}
        >

            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

                        <Controller
                            control={control}
                            name="initialBalance"
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency 
                                    error={errors.initialBalance?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input 
                        type="text"
                        placeholder="Nome da conta"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                   <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                             <Select 
                                placeholder="Tipo" 
                                onChange={onChange}
                                value={value}
                                options={[
                                    { value: "CHECKING", label: "Conta Corrente" },
                                    { value: "INVESTMENT", label: "Investimento" },
                                    { value: "CASH", label: "Dinheiro" },
                                ]}
                                error={errors.type?.message}
                            />
                        )}
                   />

                    <Controller 
                        control={control}
                        name="color"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdownInput
                                onChange={onChange}
                                value={value}
                                error={errors.color?.message}
                            />
                        )}
                    />

                    <Button 
                        type="submit"
                        className="w-full mt-6"
                        isLoading={isLoading}
                    >
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}