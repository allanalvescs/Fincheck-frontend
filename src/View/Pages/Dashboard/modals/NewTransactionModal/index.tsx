import { Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { DatePickerInput } from "../../../../Components/DatePickerInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";


export function NewTransactionModal() {
    const {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType,
        control,
        errors,
        register,
        handleSubmit,
        accounts,
        categories,
        isLoading
    } = useNewTransactionModalController();

    const isExpense = newTransactionType === "EXPENSE";
    return (
                <Modal
                    title={isExpense ? "Nova Despesa" : "Nova Receita"}
                    open={isNewTransactionModalOpen}
                    onClose={closeNewTransactionModal}
                >
                    <form onSubmit={handleSubmit}>
                          <div>
                                <span className="text-gray-600 tracking-[-0.5px] text-xs">
                                    Valor da {isExpense ? "despesa" : "receita"}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                                    <Controller
                                        control={control}
                                        name="value"
                                        defaultValue="0"
                                        render={({ field: { onChange, value } }) => (
                                            <InputCurrency 
                                                error={errors.value?.message}
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
                                placeholder={`Nome da ${isExpense ? "despesa" : "receita"}`}
                                {...register("name")}
                                error={errors.name?.message}
                            />
        
                            <Controller
                                control={control}
                                name="categoryId"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Categoria"
                                        onChange={onChange}
                                        value={value}
                                        options={categories.map(category => ({
                                            value: category.id,
                                            label: category.name
                                        }))}
                                        error={errors.categoryId?.message}
                                    />
                                )}
                            />

                             <Controller
                                control={control}
                                name="bankAccountId"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder={isExpense ? "Pagar com" : "Receber com"} 
                                        onChange={onChange}
                                        value={value}
                                        options={accounts.map(account => ({
                                            value: account.id,
                                            label: account.name
                                        }))}
                                        error={errors.bankAccountId?.message}
                                    />
                                )}
                             />

                           <Controller
                                control={control}
                                name="date"
                                defaultValue={new Date()}
                                render={({ field: { value, onChange } }) => (
                                    <DatePickerInput
                                        value={value}
                                        error={errors.date?.message}
                                        onChange={onChange}
                                    />
                                )}
                           />
                            <Button 
                                type="submit" 
                                className="w-full mt-6"
                                isLoading={isLoading}
                            >
                                Criar
                            </Button>
                        </div>
                    </form>
                </Modal>
    )
}