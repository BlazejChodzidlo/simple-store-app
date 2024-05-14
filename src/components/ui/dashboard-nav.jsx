"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './button';
import Link from 'next/link';
import { motion } from "framer-motion"

const MotionLink = motion(Link)

function DashBoardNav({links}) {
    const pathname = usePathname();

  return (
    <div className='p-2 rounded-md flex flex-row gap-1'>
        {
            links.map((item, index) => {
                return (
                    <Button key={index} variant="ghost" asChild className={`w-full bg-transparent`}>
                        <MotionLink href={item.href} className='relative bg-transparent'>
                            <motion.span className='relative z-10'>{item.title}</motion.span>
                            {
                                pathname === item.href ?
                                (
                                    <motion.div transition={{type: 'spring'}} layoutId='underline' className='absolute w-full h-full rounded-md left-0 bottom-0 bg-muted'></motion.div>
                                )
                                :
                                null
                            }
                        </MotionLink>
                    </Button>
                )
            })
        }
    </div>
  )
}

export default DashBoardNav