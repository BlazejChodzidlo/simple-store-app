import SignInForm from '@/components/ui/sign-in-form'
import { getSession } from '@/lib/session/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

async function Register() {
  const session = await getSession()

  if(session){
    redirect('/profile')
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen" >
      <SignInForm />
    </div>
  )
}

export default Register