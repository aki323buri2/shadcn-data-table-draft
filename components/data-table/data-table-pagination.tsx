import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export default function DataTablePagination<TData>({
  table, 
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 gap-3">

      {/* pagination info */}
      <div className="flex min-w-[250px] items-center justify-center text-sm font-medium text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()} {" ("}
        {table.getFilteredRowModel().rows.length.toLocaleString()} {" records)"}
      </div>

      {/* slider */}
      <div className="flex items-center grow">
        <Slider
          defaultValue={[0]}
          max={table.getPageCount() - 1}
          step={1}
          value={[table.getState().pagination.pageIndex]}
          onValueChange={([value]) => {
            table.setPageIndex(value)
          }}
          disabled={table.getPageCount() === 0}
          className={cn(
            "hover:cursor-pointer", 
            table.getPageCount() <= 1 ? "hidden" : "", 
          )}
        />
      </div>

      {/* pagination buttons */}
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            table.setPageIndex(0)
          }}
          disabled={table.getPageCount() == 0}
        >
          first page
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            table.previousPage()
          }}
          disabled={!table.getCanPreviousPage()}
        >
          prev
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
        >
          next
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            table.setPageIndex(table.getPageCount()-1)
          }}
          disabled={table.getPageCount() == 0}
        >
          last Page
        </Button>
      </div>
    </div>
  )
}