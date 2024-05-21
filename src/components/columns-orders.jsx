"use client"

import { DataTableColumnHeader } from "./ui/data-table-column-header"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogTrigger } from "./ui/dialog"
import { statuses } from "./data"

export const columns = [
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <DataTableColumnHeader title={"Email"} column={column} />
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("email")
       
            return <div className="text-left font-medium">{value}</div>
        },
    },
    {
        accessorKey: "address",
        header: () => {
            return (
                <div className="text-left">Adres</div>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("address")
       
            return <div className="text-left font-medium">{value}</div>
        },
    },
    {
        accessorKey: "created",
        header: () => {
            return (
                <div className="text-left">Data rozpoczęcia</div>
            )
        },
        cell: ({ row }) => {
            const value = new Date(row.original.createdAt)

            const formatted = new Intl.DateTimeFormat({language: "pl-PL"}, {
                day: 'numeric',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(value)
       
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "updated",
        header: () => {
            return (
                <div className="text-left">Ostatnia aktualizacja</div>
            )
        },
        cell: ({ row }) => {
            const value = new Date(row.original.updatedAt)

            const formatted = new Intl.DateTimeFormat({language: "pl-PL"}, {
                day: 'numeric',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(value)
       
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <DataTableColumnHeader title={"Wartość"} column={column} />
            )
        },
        cell: ({ row }) => {
            const value = new Date(row.original.netAmount)

            const formatted = new Intl.NumberFormat("pl-PL", {
                currency: "PLN",
                style: 'currency'
            }).format(value)
       
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => {
            return (
                <div className="text-left">Status</div>
            )
        },
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
              )
        
              if (!status) {
                return null
              }
       
            return (
                <div className="font-medium flex items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )

        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ table, row }) => {
          const user = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Zarządzaj</DropdownMenuLabel>
                <DropdownMenuItem className="w-full" onClick={() => navigator.clipboard.writeText(user.id)}>
                    Kopiuj ID zamówienia
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild disabled={user.admin}>
                  <DialogTrigger className="w-full" onClick={() => {table.options?.meta?.onDisplay(user)}}>
                    Podgląd zamównienia
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" asChild disabled={user.admin}>
                  <DialogTrigger className="w-full" onClick={() => {table.options?.meta?.onDelete(user.id)}}>
                    Anuluj zamówienie
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]