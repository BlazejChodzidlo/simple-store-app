import LoginForm from '@/components/ui/login-form'
import React from 'react'

async function Zaloguj() {
  return (
    <div className="w-full flex flex-col items-center justify-center" style={{minHeight: 'calc(100vh - 57px)'}}>
      <LoginForm />
    </div>
  )
}

export default Zaloguj