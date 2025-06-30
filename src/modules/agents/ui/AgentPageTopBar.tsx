'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon, Search } from "lucide-react"
import AgentCommandBar from "./AgentCommandBar"
import { useState } from "react"
import { useAgentParams } from "../hooks/useAgentParams"


const AgentPageTopBar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
         const [filter,setFilter] = useAgentParams()

     const isFeildModified= !!filter.search
    
         const clearFilter= ()=>{
          setFilter({
            page:1,
            search:""
          })
         }

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
       <div className="flex ml-3 space-x-2 w-full max-w-md p-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={filter.search}
          onChange={(e) => setFilter({search:e.target.value})}
          placeholder="Search..."
          className="w-[80%] pl-10 pr-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {isFeildModified && (
        <button
          onClick={clearFilter}
          className="px-4 py-2 bg-red-500 -translate-x-12 text-white rounded-md hover:bg-red-600 transition"
        >
          Clear
        </button>
      )}
    </div>
    </>
  );
}

export default AgentPageTopBar