import { auth } from '@/auth'
import Login from '@/modules/auth/SignIn'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    console.log(session);
    if (session) {
      redirect('/')
    }
  return <Login/>
}

export default page