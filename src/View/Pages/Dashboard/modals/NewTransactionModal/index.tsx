import { Button } from "../../../../Components/Button";
import { DatePickerInput } from "../../../../Components/DatePickerInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";


export function NewTransactionModal () {
    const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useNewTransactionModalController();

    const isExpense = newTransactionType === "EXPENSE";
    return (
                <Modal
                    title={isExpense ? "Nova Despesa" : "Nova Receita"}
                    open={isNewTransactionModalOpen}
                    onClose={closeNewTransactionModal}
                >
                    <form>

                          <div>
                                <span className="text-gray-600 tracking-[-0.5px] text-xs">
                                    Valor da {isExpense ? "despesa" : "receita"}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                                    <InputCurrency />
                                </div>
                            </div>
                        
                        <div className="mt-10 flex flex-col gap-4">
                            <Input 
                                type="text"
                                name="name"
                                placeholder={`Nome da ${isExpense ? "despesa" : "receita"}`}
                            />
        
                            <Select
                                placeholder="Categoria" 
                                options={[
                                    { value: "CHECKING", label: "Conta Corrente" },
                                    { value: "INVESTIMENT", label: "Investimento" },
                                    { value: "CASH", label: "Dinheiro" },
                                ]}
                            />

                             <Select
                                placeholder={isExpense ? "Pagar com" : "Receber com"} 
                                options={[
                                    { value: "CHECKING", label: "Conta Corrente" },
                                    { value: "INVESTIMENT", label: "Investimento" },
                                    { value: "CASH", label: "Dinheiro" },
                                ]}
                            />

                            <DatePickerInput />
                            <Button type="submit" className="w-full mt-6">
                                Criar
                            </Button>
                        </div>
                    </form>
                </Modal>
    )
}