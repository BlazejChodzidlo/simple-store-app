"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from './navigation-menu'
import Link from 'next/link'
import NavProfileButton from './nav-profile-button'

function Nav() {
  return (
    <div className={`py-2 mx-auto relative w-full border-b shadow`}>
      <NavigationMenu className="mx-auto">
          <NavigationMenuList>
              <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Strona Główna
                      </NavigationMenuLink>
                  </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <Link href="/produkty" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Produkty
                      </NavigationMenuLink>
                  </Link>
              </NavigationMenuItem>
          </NavigationMenuList>
      </NavigationMenu>
      <NavProfileButton />
    </div>
  )
}

export default Nav