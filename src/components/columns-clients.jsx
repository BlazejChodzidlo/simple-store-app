"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React from "react"
import { DataTableColumnHeader } from "./ui/data-table-column-header"
import { DialogTrigger } from "./ui/dialog"

export const columns = [
    {
        accessorKey: "name",
        header: () => <div className="text-left">Name</div>,
        cell: ({ row }) => {
          const name = row.getValue("name")
     
          return <div className="text-left font-medium">{name}</div>
        },
    },
    {
        accessorKey: "surname",
        header: () => <div className="text-left">Surname</div>,
        cell: ({ row }) => {
          const surname = row.getValue("surname")
     
          return <div className="text-left font-medium">{surname}</div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Email" />
          )
        },
        cell: ({ row }) => {
          const email = row.getValue("email")
     
          return <div className="text-left font-medium">{email}</div>
        },
    },
    {
        accessorKey: "count",
        header: () => <div className="text-left">Orders</div>,
        cell: ({ row }) => {
          const count = row.getValue("count")
     
          return <div className="text-left font-medium">{count}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
              <DataTableColumnHeader column={column} title="Amount" />
            )
        },
        cell: ({ row }) => {
          const amount = row.getValue("amount")
          const formmated = new Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'USD'
          }).format(amount)
     
          return <div className="text-left font-medium">{formmated}</div>
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
                    Copy customer ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild disabled={user.admin}>
                  <DialogTrigger className="w-full" onClick={() => {table.options?.meta?.onDisplay(user)}}>
                    Edit customer
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" asChild disabled={user.admin}>
                  <DialogTrigger className="w-full" onClick={() => {table.options?.meta?.onDelete(user.id)}}>
                    Delete customer
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]