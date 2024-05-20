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
                    <CircleUser /> {name ? name : 'Zaloguj się'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    name ?
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'/profil'}>Zarządzaj</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/profil/przesylki'}>Przesylki</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/profil/zamowienia'}>Zamówienia</Link>
                        </DropdownMenuItem>
                        {
                            admin ? 
                            <DropdownMenuItem asChild>
                                <Link href={'/panel'}>Panel Sterowania</Link>
                            </DropdownMenuItem>
                            :
                            ''
                        }
                        <DropdownMenuItem asChild>
                            <span className='text-red-600 hover:bg-destructive hover:text-white' onClick={handleLogout}>Wyloguj</span>
                        </DropdownMenuItem>
                    </>
                    :
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'/zaloguj'}>Zaloguj</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/zarejestruj'}>Utwórz konto</Link>
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