"use client"

import React from 'react'
import { Input } from './input'
import { Button } from './button'
import { X } from 'lucide-react'
import DataTableViewOptions from './data-table-view-options'
import DataTableFacetedFilters from './data-table-faceted-filters'
import { statuses } from '../data'

function DataTableToolbar({table}) {
    const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-items justify-between py-4'>
        <div className='flex flex-1 items-center space-x-2'>
            <Input placeholder="Szukaj email'a" valie={(table.getColumn("email")?.getFilterValue()) ?? ""} onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)} className="h-8 w-[150px] lg:w-[250px]" />
            {
                table.getColumn('status') && (
                    <DataTableFacetedFilters column={table.getColumn('status')} title={"Status"} options={statuses}/>
                )
            }
            {
                isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X className='ml-2 h-4 w-4' />
                    </Button>
                )
            }
        </div>
        <DataTableViewOptions table={table} />
    </div>
  )
}

export default DataTableToolbar