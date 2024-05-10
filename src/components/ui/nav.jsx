import React from 'react'
import NavLinks from './nav-links'
import { getSession } from '@/lib/session/getSession'
import { logout } from '@/lib/session/logout'

async function Nav() {
  const session = await getSession()

  async function handleLogout(){
    "use server"

    await logout()
  }

  return (
    <>
      <NavLinks name={session?.name} logout={handleLogout}/>
    </>
  )
}

export default Nav