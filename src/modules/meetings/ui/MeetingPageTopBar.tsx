"use client";

import { Button } from "@/components/ui/button";
import { useAgentParams } from "@/modules/agents/hooks/useAgentParams";
import { PlusIcon, Search } from "lucide-react";
import { useState } from "react";
import MeetingCommandBar from "./MeetingCommandBar";
import StatusSelector from "./MeetingStatus";
import AgentSelector from "./AgentFilter";

const MeetingTopBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useAgentParams();

  const isFieldModified = !!filter.search || !!filter.status;

  const clearFilter = () => {
    setFilter({
      page: 1,
      search: "",
      status: null,
      agentId:""
    });
  };

  return (
    <>
      <MeetingCommandBar open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      {/* Heading and Button */}
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen((open) => !open)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap mb-5 items-center gap-3 px-4 md:px-8">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Status Selector */}
        <div className="min-w-[200px] flex gap-3 ">
          <StatusSelector />
          <AgentSelector/>
        </div>

        {/* Clear Button */}
        {isFieldModified && (
          <Button
            onClick={clearFilter}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Clear
          </Button>
        )}
      </div>
    </>
  );
};

export default MeetingTopBar;
