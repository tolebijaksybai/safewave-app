"use client"

import {useState} from "react"
import {Check, ChevronsUpDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {cn} from "@/lib/utils"
import {useTranslation} from "react-i18next"

export default function SelectWaterCombobox({
                                                items = [],
                                                value,
                                                onChange,
                                                placeholder = "select_water",
                                                disabled = false,
                                            }) {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false)

    const selectedItem = items.find((item) => String(item.id) === String(value))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedItem?.name || t(placeholder)}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-w-full p-0">
                <Command>
                    <CommandInput placeholder={t("search_water")} className="h-9"/>
                    <CommandList>
                        <CommandEmpty>{t("no_water_found")}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    disabled={item.disabled}
                                    onSelect={() => {
                                        onChange(String(item.id))
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            String(item.id) === String(value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
