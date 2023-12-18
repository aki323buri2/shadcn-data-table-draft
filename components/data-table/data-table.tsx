"use client"
import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils"
import DataTablePagination from "./data-table-pagination"
import DataTableSearchbar from "./data-table-searchbar"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Input } from "../ui/input";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSelect?: (row: Row<TData>) => void
  onAddData?: (form: HTMLFormElement | null) => void 
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSelect, 
  onAddData, 
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = 
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [adding, setAdding] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    
  })

  const handleRowClick = (row: Row<TData>) => {
    onSelect?.(row)
  } 

  const handleAdding = (newAdding: boolean) => {
    setAdding(newAdding)
  }
  const handleAddDataClick = () => {
    onAddData?.(formRef?.current)
  }

  return (
    <div>
      {/* input */}
      <DataTableSearchbar
        table={table}
        adding={adding}
        handleAdding={handleAdding}
        handleAddDataClick={handleAddDataClick}
      />

      {/* table */}
      <div
        className="rounded-md border"
        style={{
          minHeight: "36rem",
        }}
      >
        <form id="newRecordForm" ref={formRef}></form>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-2"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.enableSorting
                                ? ({ column }) => (
                                    <Button
                                      className="w-full justify-start"
                                      variant="ghost"
                                      onClick={column.getToggleSortingHandler()}
                                    >
                                      {column.columnDef.header?.toString()}

                                      <div className="pl-2">
                                        {
                                          {
                                            asc: <ArrowUp />,
                                            desc: <ArrowDown />,
                                            off: null,
                                          }[
                                            ((v) => (v ? v : "off"))(
                                              column.getIsSorted()
                                            )
                                          ]
                                        }
                                      </div>
                                    </Button>
                                  )
                                : header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHeader>

          <TableBody>
            {adding
              ? table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id}>
                        {Object(header.column.columnDef.meta)?.editable ? (
                          <Input 
                          key={header.id}
                          id={header.id}
                          label={header.column.columnDef.header?.toString()??""}
                          form="newRecordForm"
                          />
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:font-bold hover:cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No results...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <DataTablePagination table={table} />
    </div>
  )
}
