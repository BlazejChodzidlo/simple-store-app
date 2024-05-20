import React from 'react'
import NavLinks from './nav-links'
import { getSession } from '@/lib/session/getSession'
import { logout } from '@/lib/session/logout'
import { getStats } from '@/lib/connections/getStats'

async function Nav() {
  const session = await getSession()

  async function handleLogout(){
    "use server"

    await logout()
  }

  const count = await getStats()
  return (
    <>
      <NavLinks name={session?.name} logout={handleLogout} admin={session?.admin} notifications={count?.messages} />
    </>
  )
}

export default Nav