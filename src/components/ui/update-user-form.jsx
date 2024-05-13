"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { Button } from './button'
import { updateUserData } from '@/lib/connections/updateUserData'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, {message: "Imię jest zbyt krótkie."}),
    surname: z.string().min(1, {message: "Nazwisko jest zbyt krótkie."}),
    password: z.string().min(1, {message: "Należy podać hasło, aby dokonać zmian."}),
    newPassword: z.string().optional(),
    email: z.string().min(4, {message: "Email jest zbyt krótki!"}).email("Nieprawidłowy email.")
  })

function UpdateUserDataForm({data, logout}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("‎")
    const [disableEditing, setDisableEditing] = useState(true)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: "",
            newPassword: ""
        }
    })

    async function onSubmit(values){
        setLoading(true)
        const res = await updateUserData({values, currentEmail: data.email})

        if (res.status){
            await logout()
            router.push('/zaloguj')
        }
        else {
            setMessage(res?.message)
            setLoading(false)
        }
    }

    function discardChanges(){
        form.reset()
        setDisableEditing(prev => !prev)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Jan" {...field} disabled={disableEditing}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="surname" render={({field}) => (
                <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Kowalski" {...field} disabled={disableEditing}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="przykladowy@email.com" {...field} disabled={disableEditing}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} disabled={disableEditing} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="newPassword" render={({field}) => (
                <FormItem>
                    <FormLabel>Nowe hasło</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} disabled={disableEditing} />
                    </FormControl>
                </FormItem>
            )} />
            <div>
                {
                    disableEditing ? 
                    <Button variant="secondary" onClick={() => {setDisableEditing(prev => !prev)}}>Edytuj dane</Button>
                    :
                    <div className='relative'>
                        <span className="text-sm text-red-600 absolute -top-8">{message}</span>
                        <div className='space-x-3'>
                            <Button type="submit" disabled={loading} >
                                {
                                    loading ?
                                    <div className="container-dot"><div className="dot" /></div>
                                    :
                                    'Zapisz'
                                }
                            </Button>
                            <Button variant="outline" onClick={() => discardChanges()} disabled={loading}>Anuluj</Button>
                        </div>
                    </div>
                }
            </div>
        </form>
    </Form>
  )
}

export default UpdateUserDataForm