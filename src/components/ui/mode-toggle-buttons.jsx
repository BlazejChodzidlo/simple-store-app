"use client"

import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

function ModeToggleButton() {
    const { theme, setTheme } = useTheme()
    const [themeChanged, setThemeChanged] = useState(theme)

    function handleThemeChange(schema) {
        setTheme(schema)
        setThemeChanged(schema)
    }
  return (
    <div className='w-full h-full justify-start items-start'>
        <h2 className='text-xl font-bold mb-2'>Select a color schema</h2>
        <div className='flex space-x-4'>
            <div className='flex flex-col space-y-2'>
                <span className="font-medium text-md">Dark mode</span>
                <motion.button className="rounded-md outline outline-muted-foreground outline-offset-2" initial={{outlineWidth: 0}} animate={themeChanged === "dark" ? {outlineWidth: '2px'} : {outlineWidth: 0}} transition={{delay: 0, duration: 0.2, ease: 'easeIn'}} onClick={() => handleThemeChange('dark')}>
                    <div className='w-64 h-40 bg-slate-950 p-1.5 rounded-md flex flex-col items-center space-y-2'>
                        <div className='w-full bg-slate-800 rounded-md flex items-center justify-center p-1.5 space-x-2'>
                            <div className='bg-slate-600 w-10 h-3 rounded-sm'></div>
                            <div className='bg-slate-600 w-10 h-3 rounded-sm'></div>
                            <div className='bg-slate-600 w-10 h-3 rounded-sm'></div>
                        </div>
                        <div className='w-full bg-slate-800 rounded-md flex flex-row items-start p-1.5 space-x-2 flex-grow'>
                            <div className='bg-slate-600 w-3/5 rounded-sm h-full'></div>
                            <div className='flex flex-col flex-grow h-full space-y-2'>
                                <div className='bg-slate-600 w-full h-3 rounded-sm'></div>
                                <div className='bg-slate-600 w-2/3 h-5 rounded-sm'></div>
                            </div>
                        </div>
                    </div>
                </motion.button>
            </div>
            <div className='flex flex-col space-y-2'>
                <span className="font-medium text-md">Light mode</span>
                <motion.button className="rounded-md outline outline-muted-foreground outline-offset-2" initial={{outlineWidth: 0}} animate={themeChanged === "light" ? {outlineWidth: '2px'} : {outlineWidth: 0}} transition={{delay: 0, duration: 0.2, ease: 'easeIn'}} onClick={() => handleThemeChange('light')}>
                    <div className='w-64 h-40 bg-[#ecedef] p-1.5 rounded-md flex flex-col items-center space-y-2'>
                        <div className='w-full bg-white rounded-md flex items-center justify-center p-1.5 space-x-2'>
                            <div className='bg-[#ecedef] w-10 h-3 rounded-sm'></div>
                            <div className='bg-[#ecedef] w-10 h-3 rounded-sm'></div>
                            <div className='bg-[#ecedef] w-10 h-3 rounded-sm'></div>
                        </div>
                        <div className='w-full bg-white rounded-md flex flex-row items-start p-1.5 space-x-2 flex-grow'>
                            <div className='bg-[#ecedef] w-3/5 rounded-sm h-full'></div>
                            <div className='flex flex-col flex-grow h-full space-y-2'>
                                <div className='bg-[#ecedef] w-full h-3 rounded-sm'></div>
                                <div className='bg-[#ecedef] w-2/3 h-5 rounded-sm'></div>
                            </div>
                        </div>
                    </div>
                </motion.button>
            </div>
        </div>
    </div>
  )
}

export default ModeToggleButton