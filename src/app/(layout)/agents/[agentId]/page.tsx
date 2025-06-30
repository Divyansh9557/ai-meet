import LoaderState from "@/components/LoaderState";
import DynamicAgentPage from "@/modules/agents/ui/DynamicAgentPage";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface PageProps{
    params:Promise<{agentId:string}>
}

const page = async({params}:PageProps) => {
    const {agentId}= await params

     const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({
      id:agentId
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoaderState title="Fetching the Agent" description="This may take few seconds" />}>
        <DynamicAgentPage agentId={agentId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default page