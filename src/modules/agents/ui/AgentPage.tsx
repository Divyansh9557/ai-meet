'use client'


import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import AgentTable from "../AgentTable"
import { useAgentParams } from "../hooks/useAgentParams"



const AgentPage = () => {
    const [filter] = useAgentParams()
    const trpc = useTRPC()
    const {data}= useSuspenseQuery(trpc.agents.getMany.queryOptions({...filter}))
 
  return (
    <>
    
    <AgentTable data={data.agents} />
   
    </>
  )
}

export default AgentPage