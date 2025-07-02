'use client'
import { useTRPC } from "@/trpc/client";
import {  useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import DynamicMeetingHeader from "./DynamicMeetingHeader";
import { useRouter } from "next/navigation";
import UpcomingState from "./states/UpcomingState";
import ActiveState from "./states/ActiveState";
import CancelState from "./states/CancelState";
import ProcessingState from "./states/ProcessingState";



interface DynamicMeetingPageProps{
  meetingId:string;
}

const DynamicMeetingPage = ({meetingId}:DynamicMeetingPageProps) => {

  const queryClient= useQueryClient()
  const trpc = useTRPC()
  const router = useRouter()
  const {data}= useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({id:meetingId})
  )
  


  const {mutate:onDelete,isPending}= useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess:()=>{
      queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions())
      router.push("/meetings");
      }
    })
  )

  const isProcessing = data?.status ==="processing";
  const isActive = data?.status ==="active";
  const isCancelled = data?.status ==="cancelled";
  const isCompleted =data?.status ==="completed";
  const isUpcoming = data?.status ==="upcoming";
  return (
    <>
      <DynamicMeetingHeader
        meetings={data}
        meetingName={data.name}
        onDelete={() => {
          onDelete({ id: data.id });
        }}
        isPending={isPending}
      />
      {isProcessing && <ProcessingState/>}
      {isActive && <ActiveState meetingId={meetingId} />}
      {isCancelled && <CancelState/>}
      {isCompleted && <p>Completed</p>}
      {isUpcoming && <UpcomingState onCancel={()=>{}} isCancelling={false} meetingId={meetingId}  />}
    </>
  );
}

export default DynamicMeetingPage