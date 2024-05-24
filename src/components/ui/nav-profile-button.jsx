"use client "

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
  } from "@/components/ui/dropdown-menu"
import { Button } from './button'
import Link from 'next/link'
import { ModeToggle } from './mode-toogle'
import { CircleUser } from 'lucide-react'

  

function NavProfileButton({name, admin, logout}) {
    async function handleLogout() {
        await logout()
      }

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='profile'>
                    <CircleUser /> {name ? name : 'Log in'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    name ?
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'/profile'}>Manage</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/profile/delivery'}>Delivery</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/profile/orders'}>Orders</Link>
                        </DropdownMenuItem>
                        {
                            admin ? 
                            <DropdownMenuItem asChild>
                                <Link href={'/dashboard/overview'}>Dashboard</Link>
                            </DropdownMenuItem>
                            :
                            ''
                        }
                        <DropdownMenuItem asChild>
                            <span className='text-red-600 hover:bg-destructive hover:text-white' onClick={handleLogout}>Logout</span>
                        </DropdownMenuItem>
                    </>
                    :
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'/login'}>Log in</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/register'}>Register</Link>
                        </DropdownMenuItem>
                    </>
                }
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Apperance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ModeToggle />
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default NavProfileButton