"use client"

import { flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table"
import { useState } from "react"
import TablePagination from "./table-pagination"
import { motion } from "framer-motion"
import DialogUser from "./dialog-user"
import { Dialog } from "./dialog"
import { usePathname } from "next/navigation"
import DataTableToolbar from "./data-table-toolbar"

const MotionRow = motion(TableRow)

export function DataTable({columns, data, logout}) {
  let rowDelay = 0.1
  
  const path = usePathname()
  const [columnData, setColumnData] = useState()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([])


  console.log(columnFilters)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
        onDelete: (id) => {
            setColumnData(id)
        },
        onDisplay: (data) => {
            setColumnData(data)
        }
    }
  })

  return (
    <Dialog>
        <DataTableToolbar table={table} />
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        rowDelay += 0.1
                        
                        return (
                            <MotionRow initial={{opacity: 0, transform: 'translateY(-10px)'}} transition={{duration: 0.3, delay: rowDelay}} animate={{opacity: 1, transform: 'translateY(0px)'}}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </MotionRow>
                        )
                    })
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        <TablePagination table={table} />
        {
            path === "/panel/klienci" ?
             (
                <DialogUser data={columnData} logout={logout}/>
             )
             :
             null
        }
    </Dialog>
  )
}
