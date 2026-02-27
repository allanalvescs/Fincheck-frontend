import * as RdxSelect  from "@radix-ui/react-select";
import {  ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../App/Utils/cn";
import { useState } from "react";

interface SelectProps {
    className?: string;
    error?: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
}

export function Select({ className, error, placeholder, options, value, onChange }: SelectProps) {
    const [selectValue, setSelectValue] = useState(value);

    function handleSelect(value: string) {
        setSelectValue(value);
        onChange(value);
    }
    
    return (
       <div>
           <div className="relative">
                <label 
                  className={cn(
                    "absolute top-1/2 z-10 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
                    selectValue && "text-xs top-2 left-[13px] transition-all translate-y-0 bg-white",
                  )}
                >
                    {placeholder}
                </label>

                <RdxSelect.Root onValueChange={handleSelect} value={value}>
                    <RdxSelect.Trigger
                        className={cn(`
                            bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] 
                            text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4`,
                            error && "!border-red-500",
                            className
                        )}
                    >
                        <RdxSelect.Value />
                        
                        <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-2">
                            <ChevronDownIcon className="w-6 h-6 text-gray-800"/>
                        </RdxSelect.Icon>
                    </RdxSelect.Trigger>

                    <RdxSelect.Portal>
                        <RdxSelect.Content 
                            className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0, 0, 0, 0.10)]"
                        >
                            <RdxSelect.ScrollUpButton 
                                className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800"
                            >
                                <ChevronUpIcon />
                            </RdxSelect.ScrollUpButton>

                            <RdxSelect.Viewport className="p-2">
                                {options.map((option) => (
                                    <RdxSelect.Item
                                        key={option.value}
                                        value={option.value}
                                        className="p-2 text-gray-800 text-sm outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                                    </RdxSelect.Item>
                                ))}
                            </RdxSelect.Viewport>

                            <RdxSelect.ScrollDownButton 
                                className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800"
                            >
                                <ChevronDownIcon />
                            </RdxSelect.ScrollDownButton>
                        </RdxSelect.Content>
                    </RdxSelect.Portal>
                </RdxSelect.Root>
           </div>

            {error && (
                <div className="flex gap-2 items-center mt-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">{error}</span>
                </div>
            )}
       </div>
    )
}

