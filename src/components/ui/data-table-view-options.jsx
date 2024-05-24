"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu"
import { Settings2 } from "lucide-react"
import { Button } from "./button"

function DataTableViewOptions({table}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
                <Settings2 className="mr-2 h-4 w-4" />
                View
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
  )
}

export default DataTableViewOptions