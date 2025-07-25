import { auth } from "@/auth"
import HomePage from "@/modules/Layout/HomePage"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


const page = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect('/sign-in')
  }
    
    return <HomePage />
}

export default page