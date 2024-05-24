"use client"

import React from 'react'
import Link from 'next/link'
import NavProfileButton from './nav-profile-button'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import NotificationsButton from './notifications-button'


const MotionLink = motion(Link)

function NavLinks({name, admin, logout, notifications}) {
  const pathname = usePathname()

  return (
    <div className={`fixed shadow py-2 top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className='mx-auto flex flex-row gap-2'>
        <Button variant="ghost" asChild>
          <MotionLink href="/" className='relative bg-transparent'>
             <motion.span className='relative z-10'>Home</motion.span>
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
          <MotionLink href="/products" className='relative bg-transparent'>
             <motion.span className='relative z-10 bg-transparent'>Products</motion.span>
             {
              pathname === "/products" ?
              (
                <motion.div transition={{type: 'spring'}} layoutId='overline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
              )
              :
              null
             }
          </MotionLink>
        </Button>
        <Button variant="ghost" asChild>
          <MotionLink href="/offers" className='relative bg-transparent'>
             <motion.span className='relative z-10 bg-transparent'>Offers</motion.span>
             {
              pathname === "/offers" ?
              (
                <motion.div transition={{type: 'spring'}} layoutId='overline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
              )
              :
              null
             }
          </MotionLink>
        </Button>
      </div>
      <div className='absolute top-2 right-4 flex'>
      {
        name ?
        (
          <NotificationsButton notifications={notifications}/>
        )
        :
        null
      }
      <NavProfileButton name={name} logout={logout} admin={admin} />
      </div>
    </div>
  )
}

export default NavLinks