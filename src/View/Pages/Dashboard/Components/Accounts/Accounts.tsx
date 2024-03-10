import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

import { EyeIcon } from "../../../../Components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsSlideNavigation } from "./AccountsSlideNavigation";

export function Accounts() {
    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
            <div>
                <span className="text-white tracking-[0.5px] block">Saldo total</span>

                <div className="flex items-center gap-2">
                    <strong className="text-2xl tracking-[-1px] text-white">
                        R$ 1000,00
                    </strong>

                    <button className="w-8 h-8 flex items-center justify-center">
                        <EyeIcon open/>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
                <div>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={2.1}
                    >
                        <div className="flex justify-between mb-4" slot="container-start">
                            <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

                            <AccountsSlideNavigation />
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