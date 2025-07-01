"use client";

import React from "react";
import {
  ClockIcon,
  Loader2Icon,
  CircleCheckIcon,
  CircleXIcon,
  Timer,
} from "lucide-react";
import clsx from "clsx";

import { MeetingGetMany } from "../Types";
import GeneratedAvatar from "@/components/GeneratedAvatar";
import NoMeeting from "./NoMeeting";
import Link from "next/link";

// Status color map
const statusColorMap: Record<string, string> = {
  upcoming: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  active: "bg-blue-100 text-blue-800 border border-blue-300",
  completed: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  cancelled: "bg-rose-100 text-rose-800 border border-rose-300",
  processing: "bg-gray-100 text-gray-800 border border-gray-300",
};

// Status icon map
const statusIconMap: Record<string, React.ElementType> = {
  upcoming: ClockIcon,
  active: Loader2Icon,
  completed: CircleCheckIcon,
  cancelled: CircleXIcon,
  processing: Loader2Icon,
};

const MeetingTable = ({ meetings }: MeetingGetMany) => {
  if (!meetings || meetings.length === 0) return <NoMeeting />;

  return (
    <div className="w-[90%]  mx-auto rounded-md border bg-white overflow-hidden divide-y">
      {meetings.map((meeting) => {
        const StatusIcon = statusIconMap[meeting.status] || ClockIcon;

        return (
          <Link key={meeting.id} href={`/meetings/${meeting.id}`}>
            <div className="grid grid-cols-1 border-b-2 md:grid-cols-3 items-center gap-4 px-4 py-4 transition hover:bg-gray-50">
              {/* Left: Meeting Info */}
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-900">
                  {meeting.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {meeting.agent?.name && (
                    <GeneratedAvatar
                      seed={meeting.agent.name}
                      className="w-4 h-4"
                      varient="botttsNeutral"
                    />
                  )}
                  <span>↳ {meeting.agent?.name ?? "No Agent"}</span>
                </div>
              </div>

              {/* Center: Status */}
              <div className="flex justify-start md:justify-center">
                <div
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium capitalize",
                    statusColorMap[meeting.status]
                  )}
                >
                  <StatusIcon
                    className={clsx(
                      "h-4 w-4",
                      ["processing", "active"].includes(meeting.status) &&
                        "animate-spin"
                    )}
                  />
                  {meeting.status}
                </div>
              </div>

              {/* Right: Duration */}
              <div className="flex items-center md:justify-end text-xs text-muted-foreground gap-2">
                <Timer className="h-4 w-4" />
                {meeting.duration
                  ? `${Math.round(meeting.duration / 60)} min`
                  : "No Duration"}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MeetingTable;
