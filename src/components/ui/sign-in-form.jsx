"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';
import { createUser } from '@/lib/connections/createUser';
import { useRouter } from 'next/navigation';

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

const formSchema = z.object({
    name: z.string().min(1, {message: "Imię jest zbyt krótkie."}),
    surname: z.string().min(1, {message: "Nazwisko jest zbyt krótkie."}),
    password: z.string().min(4, {message: "Hasło jest zbyt krótkie"}).regex(passwordValidation, {message: "Hasło powinno składać się z 8 znaków, w tym duza litera, znak specjalny oraz liczba."}),
    confirmPassword: z.string().min(4),
    email: z.string().min(4, {message: "Email jest zbyt krótki!"}).email("Nieprawidłowy email.")
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Podane hasła nie są identyczne!',
    path: ['confirmPassword']
})

function SignInForm() {
    const router = useRouter()
    const [message, setMessage] = useState("‎")
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(values){
        setLoading(true)
        const res = await createUser(values)

        if (res.status) {
            setMessage("‎")
            setLoading(false)
            router.push('./zaloguj')
        }
        else {
            setMessage(res.message)
            setLoading(false)
        }
    }

  return (
    <motion.div initial={{opacity: 0, transform: 'translateY(20px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{ease: 'easeOut', delay: 0.1, duration: 0.3}} className='border rounded-md p-8 shadow w-[525px]'>
        <h2 className='w-full text-center font-medium text-xl'>Utwórz nowe konto</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Imię:</FormLabel>
                        <FormControl>
                            <Input placeholder="Jan" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="surname" render={({field}) => (
                    <FormItem>
                        <FormLabel>Nazwisko:</FormLabel>
                        <FormControl>
                            <Input placeholder="Kowalski" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                            <Input placeholder="przykladowy@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({field}) => (
                    <FormItem>
                        <FormLabel>Hasło:</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({field}) => (
                    <FormItem>
                        <FormLabel>Potwiedź hasło:</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className='flex flex-col justify-center items-left gap-6'>
                    <span className="text-sm text-red-600 -mt-8">{message}</span>
                    <div className="w-full flex flex-row justify-center">
                        <Button type="submit" disabled={loading}>
                            {
                                loading ?
                                <div className="container-dot"><div className="dot" /></div>
                                :
                                'Zarejestruj'
                            }
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    </motion.div>
  )
}

export default SignInForm