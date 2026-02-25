import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "../../App/Utils/cn"
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
    open: boolean;
    children?: React.ReactNode;
    title: string;
    rightSlot?: React.ReactNode;
    onClose?: () => void;
}

export function Modal({ open, title, children, rightSlot, onClose }: ModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className={cn(
                    "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
                    "data-[state=open]:animate-overlay-show"
                )}/>

                <Dialog.Content
                    className={cn(
                        `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[50] 
                        shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none   `,
                        "data-[state=open]:animate-content-show"
                    )}
                >
                    <header className="flex items-center justify-between h-12 text-gray-800">
                        <button 
                            className="w-12 h-12 flex items-center justify-center outline-none"
                            onClick={onClose}
                        >
                            <Cross2Icon className="w-6 h-6"/>
                        </button>
                        
                        <Dialog.Title className="text-lg font-bold tracking-[-1px]" arial-des>
                            {title}
                        </Dialog.Title>

                        <div className="w-12 h-12 flex items-center justify-center">
                            {rightSlot}
                        </div>
                    </header>

                    <div>
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
	    </Dialog.Root>
    )
}