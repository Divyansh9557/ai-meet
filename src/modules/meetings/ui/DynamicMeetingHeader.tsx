"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { useState } from "react";
import {  MeetingGetOne } from "../Types";
import CreateMeetingForm from "./CreateMeetingForm";

interface DynamicMeetingHeaderProps {
  meetings: MeetingGetOne;
  meetingName: string;
  onDelete: () => void;
  isPending: boolean;
}

const DynamicMeetingHeader = ({
  meetings,
  onDelete,
  isPending,
}: DynamicMeetingHeaderProps) => {

  const [open,onOpenChange]= useState(false)
  const [open1,onOpenChange1]= useState(false)

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-muted">
      {/* Breadcrumb */}
      <Breadcrumb className="flex items-center space-x-1">
        <BreadcrumbItem>
          <Link key={meetings.id} href="/agents">
            My Meetings
          </Link>
        </BreadcrumbItem>
        <ChevronRight />
        <BreadcrumbItem>
          <span className="font-medium text-foreground">{meetings.name}</span>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Button
            onClick={() => onOpenChange1((open1) => !open1)}
            className="flex justify-items-start bg-transparent text-black w-full mx-auto mr-7 hover:bg-gray-100  pr-8 "
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <ResponsiveDialog
            title=" Update The Agent"
            description="This action will update the agent's information. Please review your changes before proceeding."
            open={open1}
            onOpenChange={onOpenChange1}
          >
            <CreateMeetingForm
            onSuccess={() => onOpenChange1(false)}
              onCancel={() => onOpenChange1((open1) => !open1)}
              initialValues={meetings}
            />
          </ResponsiveDialog>

          <ResponsiveDialog
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete
                    your Agent and remove your data from our servers."
            open={open}
            onOpenChange={onOpenChange}
          >
            <Button
              onClick={() => onDelete()}
              className="bg-red-600 w-full hover:bg-red-400 "
            >
              {isPending ? "Deleteing..." : "Confirm"}
            </Button>
          </ResponsiveDialog>

          <Button
            onClick={() => onOpenChange((open) => !open)}
            className="text-red-500 pl-2 items-center bg-transparent hover:bg-gray-100 w-full flex justify-items-start "
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DynamicMeetingHeader;
