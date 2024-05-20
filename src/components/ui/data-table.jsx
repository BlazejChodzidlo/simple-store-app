"use client"

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader,TableRow } from "@/components/ui/table"
import { Button } from "./button"
import { useState } from "react"
import { Input } from "./input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu"
import { Settings2 } from "lucide-react"
import TablePagination from "./table-pagination"
import { motion } from "framer-motion"
import DialogUser from "./dialog-user"
import { Dialog } from "./dialog"

const MotionRow = motion(TableRow)

export function DataTable({columns, data, logout}) {
    let rowDelay = 0.1

  const [columnData, setColumnData] = useState()
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
        sorting,
        columnFilters,
        columnVisibility,
    },
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
        <div className="flex items-center py-4">
            <Input placeholder="Szukaj email'a..." value={(table.getColumn("email")?.getFilterValue()) ?? ""} onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)} className="max-w-sm" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        <Settings2 className="mr-2 h-4 w-4" />
                        Wygląd
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {
                        table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                            return (
                                <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
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
        <DialogUser data={columnData} logout={logout}/>
    </Dialog>
  )
}
