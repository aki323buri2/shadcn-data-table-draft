import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Check, Plus, X } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"

type Props<TData> = {
  table: Table<TData>
  adding?: boolean
  handleAdding?: (adding: boolean) => void 
  handleAddDataClick?: () => void 
}

export default function DataTableSearchbar<TData>({
  table, 
  adding, 
  handleAdding, 
  handleAddDataClick, 
}: Props<TData>) {
  const value = table.getState().globalFilter ?? ""
  const setValue = table.setGlobalFilter
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center justify-between gap-2 py-4">
      {/* search box */}
      <div className="relative grow">
        <Input
          label="検索…"
          value={value}
          onChange={(e) => setValue(String(e.target.value))}
          ref={inputRef}
        />
        <div className="absolute right-3 top-5">
          <X
            className="h-4 w-4 hover:cursor-pointer hover:text-muted-foreground"
            onClick={() => {
              setValue("")
              inputRef?.current?.focus()
            }}
          />
        </div>
      </div>

      {/* add button */}
      <Button
        variant="outline"
        size="icon"
        className="mt-2"
        onClick={() => {
          if (adding) {
            handleAddDataClick?.()
          }
          handleAdding?.(!adding)
        }}
      >
        {adding ? (
          <Check className="w-[1.2rem] h-[1.2rem]" />
        ) : (
          <Plus className="w-[1.2rem] h-[1.2rem]" />
        )}
      </Button>

    </div>
  )
}