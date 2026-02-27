import { BankAccount } from "../../../../../App/entities/bankAccount";
import { useDashboard } from "../../../../../App/hooks/useDashboard";
import { cn } from "../../../../../App/Utils/cn";
import { formatCurrency } from "../../../../../App/Utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../Components/icons/BankAccountTypeIcon";

interface AccountCardProps {
    data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
    const { areValuesVisible, openEditAccountModal } = useDashboard();
    const { name, currentBalance, type, color } = data;

    return (
        <div 
            className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between
            border-b-4 border-teal-950"
            style={{borderColor: color}}
            role="button"
            onClick={() => openEditAccountModal(data)}
        >
            <div>
                <BankAccountTypeIcon type={type}/>

                <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
                    {name}
                </span>
            </div>

            <div>
                <span className={
                    cn(
                        'text-gray-800 font-medium tracking-[-0.5px] mt-4 block',
                        !areValuesVisible && 'blur-[8px]'
                    )
                }>
                    {formatCurrency(currentBalance)}
                </span>
                <small className="text-gray-600 text-sm">
                    Saldo atual
                </small>
            </div>
        </div>
    )
}