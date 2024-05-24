import LoginForm from '@/components/ui/login-form'
import { getSession } from '@/lib/session/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

async function Login() {
  const session = await getSession()

  if (session){
    redirect('/profile')
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen" >
      <LoginForm />
    </div>
  )
}

export default Login