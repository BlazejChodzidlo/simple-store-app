import UpdateUserDataForm from '@/components/ui/update-user-form'
import { getUserData } from '@/lib/connections/getUserData'
import { getSession } from '@/lib/session/getSession'
import { logout } from '@/lib/session/logout'
import React from 'react'

async function Profil() {
  const session = await getSession()
  const userData = await getUserData(session?.email)

  async function handleLogout(){
    "use server"

    await logout()
  }

  return (
    <div className='flex flex-col items-start justify-start flex-grow border rounded-md shadow p-6' style={{minHeight: '71vh'}}>
      <UpdateUserDataForm data={userData} logout={handleLogout}/>
    </div>
  )
}

export default Profil