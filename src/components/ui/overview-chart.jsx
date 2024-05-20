"use client"

import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const MotionCard = motion(Card)

function OverviewChart({delay, sales}) {
  return (
    <MotionCard className="col-span-5" initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: delay, duration: 0.3}}>
        <CardHeader>
            <CardTitle>
                Miesięczne sprzedaże
            </CardTitle>
            <CardDescription>
                Wizualizacja sprzedaży w ciągu ostatnich miesięcy
            </CardDescription>
        </CardHeader>
        <CardContent>
            {
                sales ? 
                (
                    <ResponsiveContainer width={"100%"} height={375}>
                        <BarChart data={sales}>
                            <XAxis dataKey='month' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} zł`} />
                            <Bar dataKey='sales' fill='currentColor' radius={[6, 6, 0, 0]} className='fill-primary' />
                        </BarChart>
                    </ResponsiveContainer>
                    
                )
                :
                (
                    <div className='w-full h-[375px] flex flex-col items-center justify-center'>
                        <span className='text-sm text-muted-foreground'>Brak danych</span>
                    </div>
                ) 
            }
        </CardContent>
    </MotionCard>
  )
}

export default OverviewChart