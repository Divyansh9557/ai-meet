import {z} from "zod"

export const meetingsGetManySchema= z.object({
    page: z.number().default(1).optional(),
    limit: z.number().max(100).min(1).default(10).optional(),
    search: z.string().nullish().optional(),
}).optional()

export const meetingInsertSchema= z.object({
    name: z.string().min(1,{message:"name is required"}),
    agentId: z.string().min(1,{message:"instructions is required"})
})

export const meetingUpdateSchema= z.object({
    id:z.string().min(1,{message:"id is required"}),
    name: z.string().min(1,{message:"name is required"}),
    agentId: z.string().min(1,{message:"agent is required"})
})