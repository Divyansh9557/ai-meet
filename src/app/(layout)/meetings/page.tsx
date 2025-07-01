import LoaderState from "@/components/LoaderState"
import { loadSearchParams } from "@/modules/agents/hooks/loadSearchParams"
import MeetingPage from "@/modules/meetings/ui/MeetingPage"
import MeetingTopBar from "@/modules/meetings/ui/MeetingPageTopBar"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { SearchParams } from "nuqs"
import { Suspense } from "react"

type PageProps = {
  searchParams: Promise<SearchParams>
}

const page = async({searchParams}:PageProps) => {
const params = await loadSearchParams(searchParams)
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({...params})
  )

  return (
    <>
      <MeetingTopBar/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoaderState title="Meeting is Loading" description="this may take a while" />}>
          <MeetingPage />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default page