import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

import { EyeIcon } from "../../../../Components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsSlideNavigation } from "./AccountsSlideNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../App/Utils/formatCurrency";
import { cn } from "../../../../../App/Utils/cn";

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibilityValues
    } = useAccountsController();

    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
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
            </div>
        </div>
    )
}