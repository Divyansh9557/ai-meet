'use client'
import { useTRPC } from "@/trpc/client"
import {  useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import AgentIdHeaderPage from "./AgentIdHeaderPage"
import AgentIdcard from "./AgentIdCard"
import { useRouter } from "next/navigation"

interface DynamicAgentPageProps {
    agentId:string
}

const DynamicAgentPage = ({agentId}:DynamicAgentPageProps) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router= useRouter()
   const {data} = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({id:agentId})
   )

   const {mutate:onDelete,isPending} = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess:async()=>{
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions()
        )
       router.push("/agents")
      }
    })
   )

   

  return (
    <>
      <AgentIdHeaderPage
        agent={data}
        isPending={isPending}
        onDelete={(id: string) => onDelete({ id })}
        agentName={data.name}
      />
      <AgentIdcard data={data} />
    </>
  );
}

export default DynamicAgentPage