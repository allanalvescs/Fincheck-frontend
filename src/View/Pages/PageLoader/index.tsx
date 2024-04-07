import { Transition } from "@headlessui/react";
import { Logo } from "../../Components/Logo";
import { Spinner } from "../../Components/Spinner";

interface PageLoaderProps {
    isLoading: boolean
}

export function PageLoader({ isLoading }: PageLoaderProps) {
    return (
        <Transition
            show={isLoading}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="bg-teal-900 w-full h-full fixed top-0 left-0 flex items-center justify-center z-50">
                <div className="flex items-center justify-center flex-col gap-12">
                    <p className="text-xl text-gray-100 flex items-center">
                        Seus dados do <Logo className="inline-block text-white ml-2 mr-2"/> estão sendo carregados, por favor aguarde ...
                    </p>
                    <Spinner className="text-teal-900 fill-white"/>
                </div>
            </div>
      </Transition>
    )
}