import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

import { EyeIcon } from "../../../../Components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsSlideNavigation } from "./AccountsSlideNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../App/Utils/formatCurrency";
import { cn } from "../../../../../App/Utils/cn";
import { Spinner } from "../../../../Components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibilityValues,
        isLoading,
        accounts
    } = useAccountsController();

    const hasAccounts = accounts.length > 0;

    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
            {isLoading && (
                <div className="h-full flex-1 flex items-center justify-center">
                    <Spinner className="w-12 h-12 fill-teal-800"/>
                </div>
            )}

            {!isLoading && (
                <>
                
                    <div>
                        <span className="text-white tracking-[0.5px] block">Saldo total</span>

                        <div className="flex items-center gap-2">
                            <strong className={
                                cn(
                                    'text-2xl tracking-[-1px] text-white',
                                    !areValuesVisible && 'blur-md',
                                )
                            }>
                                {formatCurrency(150000)}
                            </strong>

                            <button 
                                className="w-8 h-8 flex items-center justify-center"
                                onClick={toggleVisibilityValues}
                            >
                                <EyeIcon open={!areValuesVisible}/>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end">
                        {!hasAccounts && (
                            <>
                                <div className="mb-4">
                                    <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                                </div>

                                <button 
                                    className="mt-6 h-52 border-2 border-dashed border-teal-500 rounded-lg text-white 
                                    flex items-center justify-center flex-col gap-4"
                                >
                                    <div className="w-12 h-12 border-2 border-dashed border-white rounded-full flex items-center justify-center">
                                        <PlusIcon className="w-5 h-5"/>
                                    </div>

                                    <span className="block w-36 text-center font-medium">
                                        Cadastrar uma conta bancária
                                    </span>
                                </button>
                            </>
                        )}

                        {hasAccounts && (
                            <div>
                                <Swiper
                                spaceBetween={16}
                                slidesPerView={windowWidth >= 1024 ? 2.1 : 1.1}
                                onSlideChange={swiper => {
                                    setSliderState({
                                        isBeginning: swiper.isBeginning,
                                        isEnd: swiper.isEnd
                                    })
                                }}
                                >
                                    <div className="flex justify-between mb-4" slot="container-start">
                                        <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                                        <AccountsSlideNavigation 
                                            isBeginning={sliderState.isBeginning}
                                            isEnd={sliderState.isEnd}
                                            />
                                    </div>
                                
                                    <SwiperSlide>
                                        <AccountCard 
                                            name="Nubank"
                                            color="#7950F2"
                                            balance={1000}
                                            type="CHECKING"
                                            />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <AccountCard 
                                            name="XP"
                                            color="#333"
                                            balance={1000}
                                            type="INVESTMENT"
                                            />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <AccountCard 
                                            name="Carteira"
                                            color="#0f0"
                                            balance={1000}
                                            type="CASH"
                                            />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}