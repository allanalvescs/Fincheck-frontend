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
import { useTransactionController } from "./useTransactionsController";

export function Transactions() {
    const { areValuesVisible } = useTransactionController();

    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">  
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
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon type="income" />

                        <div>
                            <strong className="font-bold tracking-[-0.5px] block">Serviço Software</strong>
                            <span className="text-sm text-gray-600">06/04/2024</span>
                        </div>
                    </div>

                    <span className={
                        cn(
                            'text-green-800 tracking-[-0.5px] font-medium',
                            !areValuesVisible && 'blur-[10px]'
                        )
                    }>
                        {formatCurrency(16500)}
                    </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon type="expense" />

                        <div>
                            <strong className="font-bold tracking-[-0.5px] block">Imposto de Serviço</strong>
                            <span className="text-sm text-gray-600">06/04/2024</span>
                        </div>
                    </div>

                    <span className={
                        cn(
                            'text-red-800 tracking-[-0.5px] font-medium',
                            !areValuesVisible && 'blur-[10px]'
                        )
                    }>
                        {formatCurrency(1550)}
                    </span>
                </div>

             
            </div>
        </div>
    )
}