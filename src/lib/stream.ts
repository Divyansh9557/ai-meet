
import { StreamClient } from "@stream-io/node-sdk";

 export const videoStream = new StreamClient(process.env.NEXT_PUBLIC_STREAM_KEY!,process.env.NEXT_STREAM_SECRET! );