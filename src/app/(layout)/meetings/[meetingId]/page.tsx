import LoaderState from "@/components/LoaderState";
import DynamicMeetingPage from "@/modules/meetings/ui/DynamicMeetingPage"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface PageProps{
  params:Promise<{meetingId:string}>
}

const MeetingIdPage = async({params}:PageProps) => {
  const { meetingId } = await params;
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id:meetingId})
  )

  return (<>
  <HydrationBoundary state={dehydrate(queryClient)} >
    <Suspense fallback={<LoaderState title="Meeting is loading" description="this may take a while" />} >
    <DynamicMeetingPage meetingId={meetingId} />
    </Suspense>
  </HydrationBoundary>
  </>)
}

export default MeetingIdPage