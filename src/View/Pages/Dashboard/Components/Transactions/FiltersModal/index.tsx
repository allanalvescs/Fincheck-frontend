import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../Components/Modal";
import { Button } from "../../../../../Components/Button";
import { useFiltersModalController } from "./useFiltersModalController";
import { cn } from "../../../../../../App/Utils/cn";

interface FiltersModalProps {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: { bankAccountId: string | undefined; year: number }) => void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
    const { 
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear,
        accounts
    } = useFiltersModalController();

    return (
        <Modal open={open} onClose={onClose}  title="Filtros">
            <div>
                <span className="text-lg tracking-[-1px] font-bold">
                    Conta
                </span>

                <div className="space-y-2 mt-2">
                    {accounts.map((account) => (
                        <button 
                            key={account.id}
                            className={cn(
                                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                                selectedBankAccountId === account.id && "!bg-gray-200"
                            )}
                            onClick={() => handleSelectBankAccount(account.id)}
                        >
                          {account.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <span className="text-lg tracking-[-1px] font-bold">
                    Ano
                </span>

                <div className="mt-2 w-52 flex items-center justify-between">
                    <button 
                        className=" w-12 h-12 flex justify-center items-center"
                        onClick={() => handleChangeYear(-1)}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex-1 text-center">
                        <span className="text-sm font-medium tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>
                    <button 
                        className=" w-12 h-12 flex justify-center items-center" 
                        onClick={() => handleChangeYear(1)}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <Button 
                className="w-full mt-10" 
                onClick={() => onApplyFilters({ 
                    bankAccountId: selectedBankAccountId,
                    year: selectedYear 
                })}>
                Aplicar filtros
            </Button>
        </Modal>
    )
}