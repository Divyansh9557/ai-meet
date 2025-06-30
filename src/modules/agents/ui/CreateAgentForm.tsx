import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AgentGetOne } from "../Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentInsertSchema } from "../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import toast from "react-hot-toast";
import GeneratedAvatar from "@/components/GeneratedAvatar";

interface CreateAgentFormProps {
  onSuccess?: (open: boolean) => void;
  onCancel?: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

const CreateAgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: CreateAgentFormProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async() => {
       await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
       
        onSuccess?.(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateAgent = useMutation(
    trpc.agents.updateAgent.mutationOptions({
      onSuccess: async() => {
       await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
         if(initialValues){
          queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({id:initialValues?.id}));
          initialValues.name=""
          initialValues.instructions=""
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isPending = createAgent.isPending || updateAgent.isPending ;

  const onSubmit = (value: z.infer<typeof agentInsertSchema>) => {
    if (initialValues) {
      updateAgent.mutate({id:initialValues.id,name:value.name,instructions:value.instructions})
    } else {
      createAgent.mutate(value);
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

      {/* Instructions Field */}
      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          {...form.register("instructions")}
          id="instructions"
          placeholder="Enter instructions"
          className="h-24"
        />
        {form.formState.errors.instructions && (
          <p className="text-sm text-red-600">
            {form.formState.errors.instructions.message}
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

export default CreateAgentForm;
