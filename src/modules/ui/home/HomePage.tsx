'use client'
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


const HomePage = () => {
    const {data:session} = authClient.useSession()
    const router = useRouter()
    if(!session){
        return "Loading"
    }
  return (
    <div>
        <button onClick={()=>{
            authClient.signOut({fetchOptions:{onSuccess:()=>{router.push("/sign-in")}}});
        }} >
            sign out
        </button>
    </div>
  )
}

export default HomePage