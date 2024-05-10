"use client"

import React, { useState } from 'react'
import  { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './input'
import { Button } from './button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/connections/login'

const formSchema = z.object({
    email: z.string().min(1, {message: "Pole musi być wypełnione."}).email("Nieprawidłowy adres email!"),
    password: z.string().min(1, {message: "Pole musi być wypełnione."})
})

function LoginForm() {
    const [message, setMessage] = useState("‎")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
        }
    })

    async function onSubmit(values){
        setLoading(true)
        const res = await login(values)

        if (res.status){
            setMessage("‎")
            setLoading(false)
            router.push('./')
            router.refresh()
        }
        else {
            setMessage(res.message)
            setLoading(false)
        }
    }

  return (
    <motion.div initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: 0.1, duration: 0.3}} className='border rounded-md p-8 shadow w-[525px]'>
        <h2 className='w-full text-center font-medium text-xl'>Zaloguj się do konta</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="przykładowy@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hasło</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        <div className='w-full text-right block text-sm'>
                            Nie masz konta? Kliknij <Link href={"./zarejestruj"}><span className="text-blue-500">tutaj!</span></Link>
                        </div>
                    </FormItem>
                )}/>
                <div className='flex flex-col justify-center items-left gap-6'>
                    <span className="text-sm text-red-600 -mt-8">{message}</span>
                    <div className="w-full flex flex-row justify-center">
                        <Button type="submit" disabled={loading}>
                            {
                                loading ?
                                <div class="container-dot"><div class="dot" /></div>
                                :
                                'Zaloguj'
                            }
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    </motion.div>
  )
}

export default LoginForm