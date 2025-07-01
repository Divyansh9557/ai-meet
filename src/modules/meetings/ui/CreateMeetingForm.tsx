import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  MeetingGetOne } from "../Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingInsertSchema } from "../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import toast from "react-hot-toast";
import GeneratedAvatar from "@/components/GeneratedAvatar";

interface CreateMeetingFormProps {
  onSuccess?: (open: boolean) => void;
  onCancel?: (open: boolean) => void;
  initialValues?: MeetingGetOne;
}

const CreateMeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: CreateMeetingFormProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const form = useForm<z.infer<typeof meetingInsertSchema>>({
    resolver: zodResolver(meetingInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
    },
  });

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async() => {
       await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions());
       
        onSuccess?.(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateMeeting = useMutation(
    trpc.meetings.updateMeeting.mutationOptions({
      onSuccess: async() => {
       await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions());
         if(initialValues){
          queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({id:initialValues?.id}));
          initialValues.name=""
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isPending = createMeeting.isPending || updateMeeting.isPending ;

  const onSubmit = (value: z.infer<typeof meetingInsertSchema>) => {
    if (initialValues) {
      updateMeeting.mutate({id:initialValues.id,name:value.name})
    } else {
      createMeeting.mutate(value);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto bg-white rounded-md space-y-4"
    >
      <GeneratedAvatar seed={form.watch("name")} varient="botttsNeutral" />
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


      {/* Buttons */}
      <div className="flex justify-between gap-2 pt-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onCancel?.(false);
          }}
          variant="outline"
        >
          Cancel
        </Button>
       <Button
            disabled={isPending}
            type="submit"
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            {
              initialValues?"Update":"Create"
            }
          </Button>
      </div>
    </form>
  );
};

export default CreateMeetingForm;
