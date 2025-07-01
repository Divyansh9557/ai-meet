'use client'

import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query"
import MeetingTable from "./MeetingTable"
import { useAgentParams } from "@/modules/agents/hooks/useAgentParams"

const MeetingPage = () => {

  const [filter] = useAgentParams()
    const trpc = useTRPC()
    const {data}= useSuspenseQuery(
        trpc.meetings.getMany.queryOptions({...filter})
    )
   

  return (<>
  <MeetingTable meetings={data.meetings} />
  </>
  )
}

export default MeetingPage