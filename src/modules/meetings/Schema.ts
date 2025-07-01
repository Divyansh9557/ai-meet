
import {z} from "zod"
import { MeetingStatus } from "./Types"

export const meetingsGetManySchema= z.object({
    page: z.number().default(1).optional(),
    limit: z.number().max(100).min(1).default(10).optional(),
    search: z.string().nullish().optional(),
    agentId: z.string().nullish().optional(),
  status: z.enum([
    MeetingStatus.Active,
    MeetingStatus.Cancelled,
    MeetingStatus.Completed,
    MeetingStatus.Processing,
    MeetingStatus.Upcoming,
  ]).nullish().optional(),
}).optional()

export const meetingInsertSchema= z.object({
    name: z.string().min(1,{message:"name is required"}),
    agentId: z.string().min(1,{message:"instructions is required"}).optional()
})

export const meetingUpdateSchema = z.object({
  id: z.string().min(1, { message: "id is required" }),
  name: z.string().min(1, { message: "name is required" }),
});