"use client"

import React from 'react'
import { Card, CardTitle, CardContent, CardHeader } from './card'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

function OverviewAnimatedCard({children, title, value, delay, }) {
  return (
    <MotionCard initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: delay, duration: 0.3}}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
                {title}
            </CardTitle>
            {children}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
  </MotionCard>
  )
}

export default OverviewAnimatedCard