import { auth } from "@/auth"
import LoaderState from "@/components/LoaderState"
import CallPage from "@/modules/call/ui/CallPage"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"


interface CallPageProps {
  params: Promise<{meetingId:string}>
}

const Page = async({params}:CallPageProps) => {

   const {meetingId}= await params
   const session = await auth.api.getSession({
    headers: await headers()
   })

   if(!session?.user){
     redirect("/sign-in")
   }

   const queryClient = getQueryClient()
   void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id:meetingId})
   )
   
   

  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)} >
        <Suspense fallback={<LoaderState title="Loading..." description="connecting to meeting . this may take a while" />} >
           <CallPage meetingId={meetingId} />
        </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default Page