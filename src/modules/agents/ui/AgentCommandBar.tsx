
import { ResponsiveDialog } from "@/components/ResponsiveDialog"
import CreateAgentForm from "./CreateAgentForm";


interface AgentCommandBarProps {
  open: boolean;
  onOpenChange: (open:boolean) => void;
}

const AgentCommandBar = ({open,onOpenChange}:AgentCommandBarProps) => {
  return (
    <ResponsiveDialog 
    open={open} 
    onOpenChange={onOpenChange}
    title={"New Agent"}
    description="Create New Agent"
    >
     <CreateAgentForm onCancel={onOpenChange} onSuccess={onOpenChange} />
    </ResponsiveDialog>
  )
}

export default AgentCommandBar