import LoaderState from "@/components/LoaderState"
import MeetingPage from "@/modules/meetings/ui/MeetingPage"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"


const page = () => {

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions()
  )

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoaderState title="Meeting is Loading" description="this may take a while" />}>
          <MeetingPage />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default page