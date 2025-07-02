"use client";

import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Link from "next/link";
import { FC } from "react";




interface Props {
  onLeave?: () => void;
  meetingName: string;
}

export const ActiveCall: FC<Props> = ({ onLeave, meetingName }) => {
  return (
    <div className="flex flex-col  justify-between p-4 h-full text-white">
      {/* Top bar */}
      <div className="bg-[#101213] mb-5 rounded-full p-4 flex items-center gap-4">
        <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit">
           <div className="text-xl">🌀</div>
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>

      {/* Main video layout */}
      <SpeakerLayout />

      {/* Bottom controls */}
      <div>
        <CallControls onLeave={onLeave}  />
      </div>
    </div>
  );
};
