'use client'

import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query"
import MeetingTopBar from "./MeetingPageTopBar"

const MeetingPage = () => {

    const trpc = useTRPC()
    const {data}= useSuspenseQuery(
        trpc.meetings.getMany.queryOptions()
    )

  return (<>
  <MeetingTopBar/>
  <div> {JSON.stringify(data?.meetings,null,2)} </div>
  </>
  )
}

export default MeetingPage