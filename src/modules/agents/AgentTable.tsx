import { BotIcon, VideoIcon } from "lucide-react";
import { AgentGetOne } from "./Types";
import GeneratedAvatar from "@/components/GeneratedAvatar";
import Link from "next/link";


interface AgentTableData {
  data: AgentGetOne[];
}

export default function AgentTable({ data }: AgentTableData) {
  return (
    <div className=" rounded-md shadow bg-white mx-4 mt-5 md:mx-8 p-4 space-y-4">
      {data.length === 0 ? (
        // No agent 
        <>
          <div className="flex flex-col items-center justify-center text-center py-20 px-4">
            <p className="text-sm text-muted-foreground mb-4">
              No agents found
            </p>

            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <BotIcon className="w-10 h-10 text-muted-foreground" />
            </div>

            <h2 className="text-lg font-semibold">Create your first agent</h2>

            <p className="text-sm text-muted-foreground max-w-md mt-2">
              Create an agent to join your meetings. Each agent will follow your
              instructions and can interact with participants during the call.
            </p>

            
          </div>
        </>
      ) : (
        // there is agent
        <>
          {data?.map((agent, index) => (
            <Link href={`agents/${agent.id}`} key={agent.id} >
            <div
              key={index}
              className="flex items-center  border-b-2 border-l-2 mb-4 justify-between hover:bg-muted/50 px-5 py-3 rounded-md transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <GeneratedAvatar seed={agent.name} varient="botttsNeutral" />
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {agent.instructions}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <VideoIcon className="w-4 h-4" />5 meetings
              </div>
            </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
