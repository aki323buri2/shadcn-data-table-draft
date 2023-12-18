"use client"
import { Button } from "@/components/ui/button"
import { Bumon } from "@/store/bumon"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"


export const columns: ColumnDef<Bumon>[] = [
  {
    id: "no", 
    header: "no.", 
    cell: ({ row }) => {
      return Number(row.id) + 1
    }, 
  }, 
  {
    id: "bcd", 
    header: "部署CD", 
    accessorKey: "bcd", 
    enableSorting: true, 
  }, 
  {
    id: "bnm", 
    header: "部門名", 
    accessorKey: "lv5nm", 
    enableSorting: true, 
  }, 
  {
    id: "ssy", 
    header: "支社", 
    accessorKey: "lv1nm", 
    enableSorting: true, 
  }, 
  {
    id: "bu", 
    header: "部", 
    accessorKey: "lv2nm", 
    enableSorting: true, 
  }, 
  {
    id: "actions", 
    cell: ({ row }) => {
      const bumon = row.original
      const bumonName = bumon.lv5nm
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
              部門名をコピー
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }, 
    enableSorting: false, 
  }, 
]