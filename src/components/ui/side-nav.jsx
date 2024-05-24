"use client"

import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav({links, admin, logout}) {

    const pathname = usePathname()

    function handleLogout() {
        logout()
    }

  return (
    <div className='w-72 border rounded-md p-6 flex flex-col h-fit shadow gap-0.5'>
        {
            links.map((item, index) => {

                if (!admin && item.title === "Dashboard"){
                    return
                }

                return (
                    <Button key={index} variant="ghost" asChild className={`w-full ${pathname === item.href ? "bg-muted" : "bg-transparent"}`} onClick={item.title === "Logout" ? handleLogout : ''}>
                        {
                            item.title === "Wyloguj" ? 
                            <span className='text-red-600 cursor-pointer hover:bg-destructive hover:text-white'>{item.title}</span>
                            :
                            <Link href={item.href}>{item.title}</Link>
                        }
                    </Button>
                )
            })
        }
    </div>
  )
}

export default SideNav