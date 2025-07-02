'use client'
import ErrorState from "@/components/ErrorState";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import CallPageCalls from "./CallPageCalls";

interface CallPageProps{
  meetingId:string;
}

const CallPage = ({meetingId}:CallPageProps) => {

    const trpc = useTRPC()
    const {data}= useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    )

    if(data?.status==="completed"){
      return(
        <div className="flex h-screen  items-center justify-center ">
          <ErrorState 
            title="Completed"
            description="this meeting has been completed"
          />
        </div>
      )
    }

  return (
    <CallPageCalls meetingId={data?.id} meetingName={data?.name} />
  )
}

export default CallPage