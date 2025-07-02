import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from "zod";
import { and, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { agents, meetings } from "@/db/schema";
import {
  meetingInsertSchema,
  meetingsGetManySchema,
  meetingUpdateSchema,
} from "../Schema";
import { videoStream } from "@/lib/stream";
import { generateAvatar } from "@/lib/generateAvatar";

export const meeetingRouter = createTRPCRouter({

  getToken:protectedProcedure
  .mutation(async({ctx})=>{
      await videoStream.upsertUsers([{
          id:ctx.auth.user.id,
          role:"admin",
          name:ctx.auth.user.name,
          image:ctx.auth.user.image ?? generateAvatar({seed:ctx.auth.user.name,varient:"initials"})
      }])
      const  expirationTime = Math.floor(Date.now()/1000) +3600 
      const  issueAt = Math.floor(Date.now()/1000) -60 

      const token = videoStream.generateUserToken({
        user_id:ctx.auth.user.id,
        validity_in_seconds:issueAt,
        exp:expirationTime
      })

      return token
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      
      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );


      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "meetings not found",
        });
      }

      return existingMeeting;
    }),

  getMany: protectedProcedure
    .input(meetingsGetManySchema)
    .query(async ({ input, ctx }) => {
      const { search,status,agentId } = input ?? {};

      const data = await db
        .select({
          ...getTableColumns(meetings),
          agent:agents,
          duration: sql<number>`EXTRACT(EPOCH FROM(ended_at-started_at))`.as("duration")
        })
        .from(meetings)
        .innerJoin(agents,eq(agents.id,meetings.agentId))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
            status ? eq(meetings.status,status) : undefined,
            agentId ? eq(meetings.agentId,agentId) : undefined,
      
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id));


      return {
        meetings: data,
      };
    }),
  create: protectedProcedure
    .input(meetingInsertSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.agentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "agentId is required",
        });
      }
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          agentId: input.agentId, 
          userId: ctx.auth.user.id,
        })
        .returning();

       // creating call

       const call =  videoStream.video.call("default",createdMeeting.id)
       call.create({
        data:{
          created_by_id:ctx.auth.user.id,
          custom:{
            meetingId:createdMeeting.id,
            meetingName:createdMeeting.name
          },
          settings_override:{
            transcription:{
              language:"en",
              mode:"auto-on",
              closed_caption_mode:"auto-on"
            },
            recording:{
              mode:"auto-on",
              quality:"1080p",
            }
          }
        }
       })

       const [existingAgent] = await db
       .select()
       .from(agents)
       .where(eq(agents.id,createdMeeting.agentId));

       await videoStream.upsertUsers([{
        id:existingAgent.id,
        name:existingAgent.name,
        role:"user",
        image: generateAvatar({seed:existingAgent.name,varient:"initials"})
       }]) 

      return createdMeeting;
    }),

  updateMeeting: protectedProcedure
    .input(meetingUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updateMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();

      if (!updateMeeting) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update meeting",
        });
      }
      return updateMeeting;
    }),

     delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({  input }) => {
      const [removedMeeting] = await db
        .delete(meetings)
        .where(
          eq(meetings.id, input.id)
        )
        .returning();

      if (!removedMeeting) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete meeting",
        });
      }

      return { message: "Meeing deleted successfully" };
    }),
});
