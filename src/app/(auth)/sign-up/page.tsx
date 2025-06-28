import { auth } from '@/auth'
import SignUp from '@/modules/ui/auth/SignUp'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const page = async() => {
      const session = await auth.api.getSession({
        headers: await headers(),
      })
      if (session) {
        redirect('/')
      }
 return <SignUp/>
}

export default page