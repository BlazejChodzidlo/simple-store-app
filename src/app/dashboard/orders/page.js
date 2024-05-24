import { columns } from '@/components/columns-orders'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'
import { getAllOrders } from '@/lib/connections/getAllOrders'
import React from 'react'

// export const runtime = "edge"

async function Orders() {
  const orders = await getAllOrders()

  // console.log(orders)

  return (
    <div className='w-full flex flex-col'>
      <span>Orders - this is the place where you can manage all your orders.</span>
      <Separator className="my-3"/>
      <div>
        <DataTable columns={columns} data={orders.orders} />
      </div>
      <Toaster />
    </div>
  )
}

export default Orders