"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAgentParams } from "@/modules/agents/hooks/useAgentParams";
import { useTRPC } from "@/trpc/client";
import { Loader2, UserCircle } from "lucide-react";
import { AgentGetOne } from "@/modules/agents/Types";
import { useQuery } from "@tanstack/react-query";
import GeneratedAvatar from "@/components/GeneratedAvatar";

const AgentSelector = () => {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useAgentParams();

  const {
    data: agentsData ,
    isLoading,
  } = useQuery(
    trpc.agents.getMany.queryOptions()
  )
  const selectedAgent = agentsData?.agents.find((a: AgentGetOne) => a.id === filter.agentId);

  const handleSelect = (agentId: string | null) => {
    setFilter({ ...filter, agentId });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          {selectedAgent ? (
            <span className="flex items-center gap-2">
            
              <span className="truncate">{selectedAgent.name}</span>
            </span>
          ) : (
            "Agent"
          )}
          <UserCircle className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search agents..." />
          <CommandEmpty>No agents found.</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              agentsData?.agents.map((agent: AgentGetOne) => (
                <CommandItem
                  key={agent.id}
                  value={agent.name}
                  onSelect={() => handleSelect(agent.id)}
                >
                   <GeneratedAvatar seed={agent.name} varient="botttsNeutral" /> 
                  <span className="mr-2">{agent.name}</span>
                  
                </CommandItem>
              ))
            )}
            {filter?.agentId && (
              <CommandItem onSelect={() => handleSelect(null)}>
                ❌ Clear selection
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AgentSelector;
