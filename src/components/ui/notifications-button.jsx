"use client"

import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Badge } from './badge'

function NotificationsButton({notifications}) {
  return (
    <div>
        <Button variant="profile" asChild>
            <Link href={'/profile/messages'} className="relative w-full h-full">
                    <Bell size={22}/>
                    {
                        notifications === 0 ?
                        (
                            null
                        )
                        :
                        (
                            <Badge variant={'destructive'} className={'absolute top-0 right-1.5 min-w-4 flex justify-center items-center'}>{notifications}</Badge>
                        )
                    }
                </Link>
        </Button>
    </div>
  )
}

export default NotificationsButton