"use client"
import { DataTable } from "@/components/data-table/data-table"
import { Tmasa, useTamasa } from "@/store/tmasa"
import { columns } from "./columns"
import { Row } from "@tanstack/react-table"
import React from "react"
import { Button } from "@/components/ui/button"
import { useOnClickOutside } from "usehooks-ts"
import { cn } from "@/lib/utils"
import DialogInput from "@/components/dialog-input"

export default function TmasaPage () {
  const { data=[], isLoading, error } = useTamasa()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const handleSelect = (row: Row<Tmasa>) => {
    setValue(row.getValue("ryakun"))
    setOpen(false)
  }
  const handleAddData = (form: HTMLFormElement | null) => {
    const ryakun = form?.["ryakun"] 
    const ryakuk = form?.["ryakuk"] 
    if (!!ryakun.value) return 
    setValue(ryakun)
  }
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  useOnClickOutside(dialogRef, (e) => {
    setOpen(false)
  })
  return (
    <div className="flex flex-col items-center gap-2 px-24 pt-4">
      <DialogInput
        label="得意先名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onOpen={() => setOpen(true)}
        onReset={() => setValue("")}
      />
      <dialog
        open={open}
        ref={dialogRef}
        className={cn(
          "fixed",
          "left-[50%] top-[50%]",
          "translate-x-[-50%]",
          "translate-y-[-50%]",
          "border rounded-lg p-2 z-50",
          "shadow-lg",
          "min-w-[800px]"
        )}
      >
        <DataTable
          data={data}
          columns={columns}
          onSelect={handleSelect}
          onAddData={handleAddData}
        />
      </dialog>
    </div>
  )
}