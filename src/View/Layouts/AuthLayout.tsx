import { Outlet } from "react-router-dom"

import { Logo } from "../Components/Logo"

import illustration from "../../Assets/illustration.png"

export function AuthLayout() {
    return (
        <div className="w-full h-full flex">
            <div className="w-full h-full  flex items-center justify-center flex-col gap-16 lg:w-1/2">
                <Logo className="text-gray-500 h-6"/>

                <div className="max-w-[504px] w-full  h-[400px] px-8">
                    <Outlet />
                </div>
            </div>

            <div className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex">
                <img 
                    src={illustration} 
                    alt="Dashboard Fincheck"
                    className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]" 
                />

                <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px]">
                    <Logo className="text-teal-900"/>

                    <p className="text-gray-700 font-medium text-xl mt-6">
                        Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
                        totalmente de graça!
                    </p>
                </div>
            </div>
        </div>
    )
}