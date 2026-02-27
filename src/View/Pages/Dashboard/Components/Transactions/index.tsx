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
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { FormatDate } from "../../../../../App/Utils/formatDate";

export function Transactions() {
    const { 
        areValuesVisible,
        isInitialLoading,
        isLoading,
        transactions,
        handleCloseFiltersModal,
        handleOpenFiltersModal,
        isFiltersModalOpen,
        handleChangeFilters,
        filters,
        handleApplyFilters
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
                <FiltersModal 
                    open={isFiltersModalOpen} 
                    onClose={handleCloseFiltersModal}
                    onApplyFilters={handleApplyFilters}
                />
                <header>
                    <div className="flex items-center justify-between">
                        <TransactionTypeDropdown 
                            onSelect={handleChangeFilters("type")}
                            selectedType={filters.type}
                        />

                        <button onClick={handleOpenFiltersModal}>
                            <FilterIcon/>
                        </button>
                    </div>

                    <div className="mt-6 relative">
                        <Swiper
                            slidesPerView={3}
                            centeredSlides
                            initialSlide={filters.month}
                            onSlideChange={(swiper) => {
                                if (swiper.realIndex === filters.month) return;

                                handleChangeFilters("month")(swiper.realIndex);
                            }}
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
                           {transactions.map((transaction) => (
                                <div
                                    key={transaction.id} 
                                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                                    <div className="flex-1 flex items-center gap-3">
                                        <CategoryIcon
                                            type={transaction.type === "EXPENSE" ? "expense" : "income"}
                                            category={transaction.category?.icon}
                                        />

                                        <div>
                                            <strong className="font-bold tracking-[-0.5px] block ">
                                                {transaction.name}
                                            </strong>
                                            <span className="text-sm text-gray-600">
                                                {FormatDate(new Date(transaction.date))}
                                            </span>
                                        </div>
                                    </div>

                                    <span className={cn(
                                        "text-red-800 tracking-[-0.5px] font-medium",
                                        transaction.type === "INCOME" ? "text-green-800" : "text-red-800",
                                        !areValuesVisible && "blur-sm"
                                    )}>
                                        {transaction.type === "EXPENSE" ? "- " : "+ "}
                                        {formatCurrency(transaction.value)}
                                    </span>
                                </div>
                           ))}
                        </>
                    )}
                </div>
            </>

           )}
        </div>
    )
}