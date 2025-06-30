"use client";

import { Card, CardContent } from "@/components/ui/card";
import { VideoIcon } from "lucide-react";
import GeneratedAvatar from "@/components/GeneratedAvatar";
import { AgentGetOne } from "../Types";

interface AgentIdCardProps {
  data: AgentGetOne;
}

const AgentIdcard = ({data}:AgentIdCardProps) => {

   
  return (
    <Card className="w-[95%] mx-auto ">
      <CardContent className="p-6 space-y-6">
        {/* Header: Avatar + Name + Meetings */}
        <div className="flex items-center gap-4">
          <GeneratedAvatar seed={data.name} varient="botttsNeutral" />
          <div>
            <p className="text-lg font-semibold text-foreground">{data.name}</p>
            
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2" >
            <div className="flex  items-center text-sm text-muted-foreground mt-1">
              <VideoIcon className="w-4 h-4 mr-1" />
              5 meetings
            </div>
          <p className="text-lg font-semibold text-foreground mb-1">Instructions</p>
          <p className="text-sm text-muted-foreground">{data.instructions}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentIdcard;
