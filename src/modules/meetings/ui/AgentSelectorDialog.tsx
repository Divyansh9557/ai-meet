"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Command, CommandGroup, CommandItem, CommandInput, CommandEmpty } from "@/components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile"; 

// Mock data
const agents = [
  { id: "1", name: "Alice Bot", },
  { id: "2", name: "Bob Assistant",  },
  { id: "3", name: "Charlie Helper",  },
  { id: "4", name: "a updated agent", },
];

interface AgentSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (agent: typeof agents[0]) => void;
}

export function AgentSelectorDialog({ open, onOpenChange, onSelect }: AgentSelectorDialogProps) {
  const isMobile = useIsMobile();

  const content = (
    <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
      <CommandInput placeholder="Search agent..." />
      <CommandEmpty>No options found</CommandEmpty>
      <CommandGroup heading="Agents">
        {agents.map((agent) => (
          <CommandItem
            key={agent.id}
            onSelect={() => {
              onSelect(agent);
              onOpenChange(false);
            }}
            className="flex items-center space-x-2"
          >
          
            <span>{agent.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select an Agent</DrawerTitle>
            <DrawerDescription>Search and select your AI assistant</DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Select an Agent</DialogTitle>
          <DialogDescription>Search and select your AI assistant</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
