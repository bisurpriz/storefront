import { checkUserId } from "@/app/cart/actions";
import { redisOptions } from "@/redis";
import { Redis } from "ioredis";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();
  const redis = new Redis(redisOptions);
  const userId = await checkUserId();
  redis.subscribe(`cart:${userId}`);
  const customReadable = new ReadableStream({
    start(controller) {
      redis.on("message", (channel, message) => {
        if (!message) return;
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      });
    },
    cancel() {
      redis.disconnect();
    },
  });
  return new Response(customReadable, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "Content-Encoding": "none",
    },
  });
}
