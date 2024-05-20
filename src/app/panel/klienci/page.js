import { columns } from '@/components/columns-clients'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'

import { getAllUsers } from '@/lib/connections/getAllUsers'
import { logout } from '@/lib/session/logout'
import React from 'react'

export const runtime = "edge"

async function Klienci() {
  const users = await getAllUsers()

  async function handleLogout(){
    "use server"

    await logout()
  }

  return (
      <div className='w-full flex flex-col'>
        <span>Klienci - jest to miejsce, które umożliwia przeglądanie oraz zarządzanie wszystkimi użytkownikami.</span>
        <Separator className="my-3"/>
        <div>
          <DataTable columns={columns} data={users.users} logout={handleLogout}/>
        </div>
        <Toaster />
      </div>
  )
}

export default Klienci