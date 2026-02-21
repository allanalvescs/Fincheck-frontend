import { ExitIcon } from "@radix-ui/react-icons"
import { 
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem 
} from "./DropdownMenu"
import { useAuth } from "../../App/hooks/useAuth"

export function UserMenu() {
    const { signout } = useAuth()
    return (
        <DropdownMenuRoot>
            <DropdownMenuTrigger>
                <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border-teal-500">
                    <span className="text-sm tracking-[0.5px] text-teal-900 font-medium">
                        AL
                    </span>
                </div>
            </DropdownMenuTrigger>

           <DropdownMenuContent className="w-32">
                <DropdownMenuItem 
                    className="flex items-center justify-between"
                    onSelect={signout}
                >
                    Sair
                    <ExitIcon className="w-4 h-4"/>
                </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenuRoot>
    )
}