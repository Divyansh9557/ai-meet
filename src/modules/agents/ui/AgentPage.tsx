'use client'


import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

const AgentPage = () => {
    const trpc = useTRPC()
    const {data}= useSuspenseQuery(trpc.agents.getMany.queryOptions())

    
   
  return (
    <>
    <div>{JSON.stringify(data,null,2)}</div>
    </>
  )
}

export default AgentPage