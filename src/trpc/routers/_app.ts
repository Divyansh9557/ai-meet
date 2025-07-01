
import { agentRouter } from '@/modules/agents/server/procedures';
import {  createTRPCRouter } from '../init';
import { meeetingRouter } from '@/modules/meetings/server/procedure';
export const appRouter = createTRPCRouter({
  agents:agentRouter,
  meetings:meeetingRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;