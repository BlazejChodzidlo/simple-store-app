"use client"

import React from 'react'
import  { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './input'
import { Button } from './button'
import { delay, motion } from 'framer-motion'

const formSchema = z.object({
    email: z.string().min(1, {message: "Pole musi być wypełnione."}).email("Nieprawidłowy adres email!"),
    password: z.string().min(1, {message: "Pole musi być wypełnione."})
})

function LoginForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
        }
    })

    function onSubmit(values){
        console.log(values)
    }

  return (
    <motion.div layout initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: 0.1, duration: 0.3}} className='border rounded-md p-8 shadow w-[525px]'>
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
                    </FormItem>
                )}/>
                <Button type="submit">Zaloguj</Button>   
            </form>
        </Form>
    </motion.div>
  )
}

export default LoginForm