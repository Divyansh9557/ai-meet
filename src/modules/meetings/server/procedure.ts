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

export const meeetingRouter = createTRPCRouter({
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
          agentId: input.agentId, // ensure agentId is defined
          userId: ctx.auth.user.id,
        })
        .returning();
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
