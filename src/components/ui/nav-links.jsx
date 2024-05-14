"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from './navigation-menu'
import Link from 'next/link'
import NavProfileButton from './nav-profile-button'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from './button'


const MotionLink = motion(Link)

function NavLinks({name, admin, logout}) {
  const pathname = usePathname()

  return (
    <div className={`fixed shadow py-2 top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className='mx-auto flex flex-row gap-2'>
        <Button variant="ghost" asChild>
          <MotionLink href="/" className='relative bg-transparent'>
             <motion.span className='relative z-10'>Strona główna</motion.span>
             {
              pathname === "/" ?
              (
                <motion.div transition={{type: 'spring'}} layoutId='overline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
              )
              :
              null
             }
          </MotionLink>
        </Button>
        <Button variant="ghost" asChild>
          <MotionLink href="/produkty" className='relative bg-transparent'>
             <motion.span className='relative z-10 bg-transparent'>Produkty</motion.span>
             {
              pathname === "/produkty" ?
              (
                <motion.div transition={{type: 'spring'}} layoutId='overline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
              )
              :
              null
             }
          </MotionLink>
        </Button>
        <Button variant="ghost" asChild>
          <MotionLink href="/oferty" className='relative bg-transparent'>
             <motion.span className='relative z-10 bg-transparent'>Oferty</motion.span>
             {
              pathname === "/oferty" ?
              (
                <motion.div transition={{type: 'spring'}} layoutId='overline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
              )
              :
              null
             }
          </MotionLink>
        </Button>
      </div>
      <NavProfileButton name={name} logout={logout} admin={admin}/>
    </div>
  )
}

export default NavLinks