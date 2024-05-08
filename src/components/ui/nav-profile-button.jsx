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

  

function NavProfileButton() {
  return (
    <div className="absolute top-2 right-12">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='profile'>Konto</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Szczegóły</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* dodać zmiany gdzie bedzie sesja i gdy jej nie bedzie */}
                <DropdownMenuItem asChild>
                    <Link href={'./zaloguj'}>Zaloguj</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'./zarejestruj'}>Utwórz konto</Link>
                </DropdownMenuItem>
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