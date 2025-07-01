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
import {
  ClockIcon,
  CircleCheckIcon,
  CircleXIcon,
  LoaderIcon,
  Clock,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { MeetingStatus } from "../Types";
import { useAgentParams } from "@/modules/agents/hooks/useAgentParams";

// Icon mapping
const statusIconMap: Record<MeetingStatus, React.ReactNode> = {
  upcoming: <ClockIcon className="mr-2 h-4 w-4" />,
  active: <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />,
  completed: <CircleCheckIcon className="mr-2 h-4 w-4 text-emerald-600" />,
  processing: <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />,
  cancelled: <CircleXIcon className="mr-2 h-4 w-4 text-rose-500" />,
};

// Label mapping
const statusLabelMap: Record<MeetingStatus, string> = {
  upcoming: "Upcoming",
  active: "Active",
  completed: "Completed",
  processing: "Processing",
  cancelled: "Cancelled",
};

const StatusSelector = () => {
  const [filter, setFilter] = useAgentParams();
  const [open, setOpen] = useState(false);

  const handleChange = (status: MeetingStatus | undefined |null) => {
    if(!status){

      setFilter({ status:null});
    }
    else{

      setFilter({ ...filter, status });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {filter.status ? (
            <>
              {statusIconMap[filter.status]}
              {statusLabelMap[filter.status]}
            </>
          ) : (
            "Select status"
          )}
          <Clock className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {/* Clear option */}
            {filter.status && (
              <CommandItem
                onSelect={() => {
                  handleChange(null); // clear status
                  setOpen(false);
                }}
              >
                <XIcon className="mr-2 h-4 w-4 text-gray-500" />
                Clear status
              </CommandItem>
            )}

            {/* Status options */}
            {Object.values(MeetingStatus).map((status) => (
              <CommandItem
                key={status}
                value={status}
                onSelect={() => {
                  handleChange(status);
                  setOpen(false);
                }}
              >
                {statusIconMap[status]}
                {statusLabelMap[status]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusSelector;
