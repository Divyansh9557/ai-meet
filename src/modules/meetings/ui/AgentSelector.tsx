"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "@/modules/agents/Types";
import { useQuery } from "@tanstack/react-query";
import GeneratedAvatar from "@/components/GeneratedAvatar";

interface AgentSelectorProps {
  value?: string;
  onChange: (agent: AgentGetOne) => void;
}

const AgentSelector = ({ value, onChange }: AgentSelectorProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const trpc = useTRPC();

  // ✅ FIX: Use correct query key to fetch agents
  const {
    data: agents = [],
    isLoading,
    isError,
  } = useQuery(trpc.agents.getMany.queryOptions()); // <-- make sure this matches your tRPC router

  // ✅ FIX: Use fallback empty array
  const selected =
    Array.isArray(agents)
      ? agents.find((a: AgentGetOne) => a.id === value)
      : agents?.agents?.find((a: AgentGetOne) => a.id === value);

  const Trigger = (
    <Button
      type="button"
      onClick={() => setOpen(true)}
      variant="outline"
      className="w-full justify-between px-3 py-2 h-12 text-sm font-normal border rounded-md"
    >
      {selected ? (
        <div className="flex items-center gap-2">
            <GeneratedAvatar seed={selected.name} varient="botttsNeutral" />
          <span>{selected.name}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">Select an agent</span>
      )}
      <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
    </Button>
  );

  const CommandContent = (
    <Command className="p-0">
      <CommandInput placeholder="Search agents..." />
      <CommandEmpty>No agents found</CommandEmpty>
      <CommandGroup heading="Agents">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 p-2">Failed to load agents</div>
        ) : (
          (Array.isArray(agents)
            ? agents
            : agents?.agents ?? []
          ).map((agent: AgentGetOne) => (
            <CommandItem
              key={agent.id}
              onSelect={() => {
                onChange(agent);
                setOpen(false);
              }}
            >
                <GeneratedAvatar seed={agent.name} varient="botttsNeutral" />
              <span>{agent.name}</span>
            </CommandItem>
          ))
        )}
      </CommandGroup>
    </Command>
  );

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Agent</Label>
      {Trigger}

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Select Agent</DrawerTitle>
            </DrawerHeader>
            {CommandContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="sr-only">Select Agent</DialogTitle>
            </DialogHeader>
            {CommandContent}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AgentSelector;
