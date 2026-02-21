import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../Components/DropdownMenu";
import { TransactionsIcon } from "../../../../Components/icons/TransactionsIcon";
import { IncomeIcon } from "../../../../Components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../Components/icons/ExpensesIcon";

export function TransactionTypeDropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <button className="flex items-center gap-2">
                    <TransactionsIcon />
                    <span className="text-sm text-gray-800 tracking-[-0.5px]">Transações</span>
                    <ChevronDownIcon/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-[279px]">

                <DropdownMenu.Item className="gap-2">
                    <IncomeIcon/>
                    Receitas
                </DropdownMenu.Item>

                 <DropdownMenu.Item className="gap-2">
                    <ExpensesIcon/>
                    Despesas
                </DropdownMenu.Item>
                
                <DropdownMenu.Item className="gap-2">
                    <TransactionsIcon/>
                    Transações
                </DropdownMenu.Item>
            
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}