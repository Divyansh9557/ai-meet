import { auth } from "@/auth"
import LoaderState from "@/components/LoaderState"
import AgentPage from "@/modules/agents/ui/AgentPage"
import AgentPageTopBar from "@/modules/agents/ui/AgentPageTopBar"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"


const page = async() => {

  const session  =  await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user){
     redirect('/sign-in')
  }
 
  const queryClient =   getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())


  return<>
    <AgentPageTopBar/>
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={ <LoaderState title="Agents is Loading" description="This may take some time" />} >
       <AgentPage/>
      </Suspense>

    </HydrationBoundary>
  </> 
}

export default page