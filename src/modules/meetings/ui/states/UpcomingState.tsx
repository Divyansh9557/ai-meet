import { Button } from "@/components/ui/button"
import { Ban, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link";

interface Props {
  onCancel: () => void;
  isCancelling: boolean;
  meetingId:string
}

const UpcomingState = ({onCancel,isCancelling,meetingId}:Props) => {
  return (
      <div className="flex flex-col items-center justify-center px-4 py-10 text-center bg-white rounded-xl shadow-md border">
      {/* Illustration */}
      <div className="mb-6">
        <Image
          src="/upcoming.svg"
          alt="Not started"
          width={200}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2 text-gray-900">Not started yet</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-md mb-6">
        Once you start this meeting, a summary will appear here
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button disabled={isCancelling} variant="outline" className="bg-red-400 hover:text-white hover:bg-red-500 text-white " onClick={onCancel}>
          <Ban className="w-4 h-4 mr-2" />
          Cancel meeting
        </Button>
        <Link href={`/call/${meetingId}`} >
        <Button disabled={isCancelling} >
          <Video className="w-4 h-4 mr-2" />
          Start meeting
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default UpcomingState