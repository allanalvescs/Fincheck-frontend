import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu"
import { cn } from "../../App/Utils/cn"

export function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Root>
            {children}
        </RdxDropdownMenu.Root>
    )
}

interface DropdownMenuTriggerProps {
    children: React.ReactNode,
    className?: string
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
    return (
        <RdxDropdownMenu.Trigger className={cn('outline-none', className)} asChild>
            {children}
        </RdxDropdownMenu.Trigger>
    )
}

interface DropdownMenuContentProps {
    children: React.ReactNode,
    className?: string
}

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content 
                className={cn(
                    "z-50 rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-[276px]",
                    "data-[side=bottom]:animate-slide-up-and-fade",
                    "data-[side=top]:animate-slide-down-and-fade",
                    className
                )}
            >
                {children}
            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    )
}

interface DropdownMenuItemProps {
    children: React.ReactNode;
    className?: string;
    onSelect?: () => void
}

export function DropdownMenuItem({ children, className, onSelect }: DropdownMenuItemProps) {
    return (
        <RdxDropdownMenu.Item
            onSelect={onSelect}
            className={cn(
                'min-h-[40px] outline-none flex items-center py-2 px-4 text-sm text-gray-700 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
                className
            )}
        >
            {children}
        </RdxDropdownMenu.Item>
    )
}

export const DropdownMenu = {
    Root: DropdownMenuRoot,
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem
}