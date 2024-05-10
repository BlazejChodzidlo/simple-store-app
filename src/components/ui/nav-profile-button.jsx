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

  

function NavProfileButton({name, logout}) {
    async function handleLogout() {
        await logout()
      }

  return (
    <div className="absolute top-2 right-12">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='profile'>
                    <CircleUser /> {name ? name : 'Zaloguj się'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    name ?
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'./zaloguj'}>Zarządzaj</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'./zarejestruj'}>Zamówienia</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <span className='text-red-600' onClick={handleLogout}>Wyloguj</span>
                        </DropdownMenuItem>
                    </>
                    :
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'./zaloguj'}>Zaloguj</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'./zarejestruj'}>Utwórz konto</Link>
                        </DropdownMenuItem>
                    </>
                }
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Wygląd</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ModeToggle />
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default NavProfileButton