import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../Components/DropdownMenu";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../Components/icons/BankAccountIcon";
import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function Fab() {
    const { openNewAccountModal, openNewTransactionModal } = useDashboard();
    return (
        <div className="fixed right-4 bottom-4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button 
                        className="bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                        <PlusIcon className="w-6 h-6"/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content className="position relative right-4 w-[250px]">
                    <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("EXPENSE")}>
                        <CategoryIcon type="expense"/>
                        Nova Despesa
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("INCOME")}>
                        <CategoryIcon type="income"/>
                        Nova Receita
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
                        <BankAccountIcon />
                        Nova Conta
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    )
}