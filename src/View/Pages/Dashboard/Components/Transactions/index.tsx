import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../Components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../Components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../App/config/constants";
import { cn } from "../../../../../App/Utils/cn";
import { SliderOption } from "./sliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../App/Utils/formatCurrency";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../Components/Spinner";
import emptyStateImage from "../../../../../Assets/Empty State.svg";

export function Transactions() {
    const { 
        areValuesVisible,
        isInitialLoading,
        isLoading,
        transactions, 
    } = useTransactionsController();

    const hasTransactions = transactions.length > 0;

    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">  
            {isInitialLoading && (
                <div className="h-full flex-1 flex items-center justify-center">
                    <Spinner className="w-12 h-12"/>
                </div>
           )}
            
           {!isInitialLoading && (
            <>
                <header>
                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2">
                            <TransactionsIcon />
                            <span className="text-sm text-gray-800 tracking-[-0.5px]">Transações</span>
                            <ChevronDownIcon/>
                        </button>

                        <button>
                            <FilterIcon/>
                        </button>
                    </div>

                    <div className="mt-6 relative">
                        <Swiper
                            slidesPerView={3}
                            centeredSlides
                        >
                            <SliderNavigation />
                        {MONTHS.map((month, index) => (
                            <SwiperSlide key={month}>
                                {({ isActive }) => (
                                    <SliderOption
                                        isActive={isActive}
                                        month={month}
                                        index={index}
                                        key={index}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </header>
                <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                    {isLoading && (
                         <div className="h-full flex-1 flex flex-col items-center justify-center gap-4">
                            <Spinner className="w-10 h-10"/>
                        </div>
                    )}

                    {(!hasTransactions && !isLoading) && (
                        <div className="h-full flex-1 flex flex-col items-center justify-center gap-4">
                            <img src={emptyStateImage} alt="Empty State" className="w-48"/>

                            <div className="text-center">
                                <strong className="font-bold text-lg tracking-[-0.5px] block">Nenhuma transação encontrada</strong>
                                <span className="text-sm text-gray-700">Parece que você ainda não tem transações para este período.</span>
                            </div>
                        </div>
                    )}

                    {(hasTransactions && !isLoading) && (
                        <>
                            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                                <div className="flex-1 flex items-center gap-3">
                                    <CategoryIcon type="expense"/>

                                    <div>
                                        <strong className="font-bold tracking-[-0.5px] block ">Almoço</strong>
                                        <span className="text-sm text-gray-600">01/05/2026</span>
                                    </div>
                                </div>

                                <span className={cn(
                                    "text-red-800 tracking-[-0.5px] font-medium",
                                    !areValuesVisible && "blur-sm"
                                )}>
                                    {formatCurrency(16000)}
                                </span>
                            </div>

                            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                                <div className="flex-1 flex items-center gap-3">
                                    <CategoryIcon type="income"/>

                                    <div>
                                        <strong className="font-bold tracking-[-0.5px] block ">Almoço</strong>
                                        <span className="text-sm text-gray-600">01/05/2026</span>
                                    </div>
                                </div>

                                <span className={cn(
                                    "text-green-800 tracking-[-0.5px] font-medium",
                                    !areValuesVisible && "blur-sm"
                                )}>
                                    {formatCurrency(16000)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </>

           )}
        </div>
    )
}