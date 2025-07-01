'use client'
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import MeetingForm from "./MeetingForm";
import { useRouter } from "next/navigation";

interface AgentCommandBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MeetingCommandBar = ({ open, onOpenChange }: AgentCommandBarProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={"New Meeting"}
      description="Create New Meeting"
    >
      <MeetingForm
        onCancel={onOpenChange}
        onSuccess={(id: string | undefined) => {
          router.push(`/meetings/${id}`);
        }}
      />
    </ResponsiveDialog>
  );
};

export default MeetingCommandBar;
