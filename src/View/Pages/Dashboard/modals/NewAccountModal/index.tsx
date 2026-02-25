import { ColorsDropdownInput } from "../../../../Components/ColorsDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

interface NewAccountModalProps {

}

export function NewAccountModal({}: NewAccountModalProps) {
    const { isNewAccountModalOpen, closeNewAccountModal } = useNewAccountModalController();
    return (
        <Modal 
            title="Nova Conta"
            open={isNewAccountModalOpen}
            onClose={closeNewAccountModal}
        >
            <form>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                        <InputCurrency />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input 
                        type="text"
                        name="name"
                        placeholder="Nome da conta"
                    />

                    <Select 
                        placeholder="Tipo" 
                        options={[
                            { value: "CHECKING", label: "Conta Corrente" },
                            { value: "INVESTIMENT", label: "Investimento" },
                            { value: "CASH", label: "Dinheiro" },
                        ]}
                    />

                    <ColorsDropdownInput />
                </div>
            </form>
        </Modal>
    )
}