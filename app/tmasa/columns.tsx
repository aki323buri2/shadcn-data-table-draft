"use client"
import { Button } from "@/components/ui/button"
import { Tmasa } from "@/store/tmasa"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"


export const columns: ColumnDef<Tmasa>[] = [
  {
    id: "no", 
    header: "no.", 
    cell: ({ row }) => {
      return Number(row.id) + 1
    }, 
  }, 
  {
    id: "tokucd", 
    header: "得意先CD", 
    accessorKey: "tokucd", 
    enableSorting: true, 
  }, 
  {
    id: "ryakun", 
    header: "得意先名", 
    accessorKey: "ryakun", 
    enableSorting: true, 
    meta: {
      editable: true, 
    }, 
  }, 
  {
    id: "ryakuk", 
    header: "得意先名カナ", 
    accessorKey: "ryakuk", 
    enableSorting: true, 
    meta: {
      editable: true, 
    }, 
  }, 
  {
    id: "actions", 
    cell: ({ row }) => {
      const bumon = row.original
      const bumonName = bumon.ryakun
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(bumonName)
            }}>
              得意先名をコピー
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }, 
    enableSorting: false, 
  }, 
]