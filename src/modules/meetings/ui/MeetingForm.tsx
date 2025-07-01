"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { meetingInsertSchema } from "../Schema";
import AgentSelector from "./AgentSelector";
import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../Types";
import AgentCommandBar from "@/modules/agents/ui/AgentCommandBar";
import { useState } from "react";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: (open: boolean) => void;
  initialValues?: MeetingGetOne;
}

const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [open, onOpenChange] = useState(false);

  const form = useForm<z.infer<typeof meetingInsertSchema>>({
    resolver: zodResolver(meetingInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data: MeetingGetOne) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions()
        );
        onSuccess?.(data.id);
      },
      onError: (error) => toast.error(error.message),
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.updateMeeting.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions()
        );
        if (initialValues) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues?.id })
          );
        }
      },
      onError: (error) => toast.error(error.message),
    })
  );

  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingInsertSchema>) => {
    if (initialValues) {
      updateMeeting.mutate({ id: initialValues.id, ...values });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto bg-white rounded-md space-y-4"
    >
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input {...form.register("name")} id="name" placeholder="Enter name" />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Agent Selector */}
      <AgentSelector
        value={form.watch("agentId")}
        onChange={(agent) => form.setValue("agentId", agent.id)}
      />
      {form.formState.errors.agentId && (
        <p className="text-sm text-red-600">
          {form.formState.errors.agentId.message}
        </p>
      )}

      <AgentCommandBar open={open} onOpenChange={onOpenChange} />

      <p className="text-sm">
        not found what are you looking for ?{" "}
        <Button className="bg-white cursor-pointer border-none hover:bg-transparent  text-green-600" onClick={(e)=>{ e.preventDefault(); onOpenChange((open)=>!open)}}>
          create new agent
        </Button>{" "}
      </p>

      {/* Buttons */}
      <div className="flex justify-between gap-2 pt-4">
       
        <Button
          type="button"
          variant="outline"
          onClick={() => onCancel?.(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isPending}
        >
          {initialValues ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default MeetingForm;
