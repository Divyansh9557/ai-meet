
import { z } from "zod";

export const agentInsertSchema= z.object({
    name: z.string().min(1,{message:"name is required"}),
    instructions: z.string().min(1,{message:"instructions is required"})
})

export const agentGetManySchema= z.object({
    page: z.number().default(1).optional(),
    limit: z.number().max(100).min(1).default(10).optional(),
    search: z.string().nullish().optional(),
}).optional()


export const agentUpdateSchema= z.object({
    id:z.string().min(1,{message:"id is required"}),
    name: z.string().min(1,{message:"name is required"}),
    instructions: z.string().min(1,{message:"instructions is required"})
})