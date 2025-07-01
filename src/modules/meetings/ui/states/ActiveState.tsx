import { Button } from "@/components/ui/button"
import {  Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link";

interface Props {
  meetingId:string
}

const ActiveState = ({meetingId}:Props) => {
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
      <h2 className="text-lg font-semibold mb-2 text-gray-900">
        Meeting is active
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-md mb-6">
       meeting will ends when all participants leave
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link href={`/call/${meetingId}`}>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Join meeting
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ActiveState