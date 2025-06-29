'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import AgentCommandBar from "./AgentCommandBar"
import { useState } from "react"


const AgentPageTopBar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <AgentCommandBar open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={()=> setIsDialogOpen((open)=> !open)} >
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
}

export default AgentPageTopBar