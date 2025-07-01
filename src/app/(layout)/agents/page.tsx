import { auth } from "@/auth"
import LoaderState from "@/components/LoaderState"
import { loadSearchParams } from "@/modules/agents/hooks/loadSearchParams"
import AgentPage from "@/modules/agents/ui/AgentPage"
import AgentPageTopBar from "@/modules/agents/ui/AgentPageTopBar"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs"
import { Suspense } from "react"


type PageProps = {
  searchParams: Promise<SearchParams>
}
 

const page = async({searchParams}:PageProps) => {
  const params = await loadSearchParams(searchParams)
  const session  =  await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user){
     redirect('/sign-in')
  }
 
  const queryClient =   getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...params}))


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