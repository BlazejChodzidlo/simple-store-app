"use client"

import React from 'react'
import { Avatar, AvatarFallback } from './avatar'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from './card'

const MotionCard = motion(Card)

function RecentSales({recentSales, delay, numberOfMonthlySales}) {
  return (
        <MotionCard className="col-span-3" initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: delay, duration: 0.3}}>
            <CardHeader>
                <CardTitle>
                    Ostatnie sprzedaże
                </CardTitle>
                <CardDescription>
                    Udało się wykonać {numberOfMonthlySales} zamówień w tym miesiącu
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8 min-h-[375px]">
                {
                    recentSales.map((sale, index) => {
                        return (
                            <div key={index} className='flex items-center'>
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{sale.user.name[0].toUpperCase()}{sale.user.surname[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className='text-sm font-medium leading-none'>{sale.user.name} {sale.user.surname}</p>
                                    <p className='text-sm text-muted-foreground'>{sale.user.email}</p>
                                </div>
                                <div className='ml-auto font-medium'>+{sale.netAmount} zł</div>
                            </div>
                        )
                    })
                }
                </div>
            </CardContent>
        </MotionCard>
  )
}

export default RecentSales