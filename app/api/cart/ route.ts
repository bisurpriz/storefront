import redis from "@/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request.body, "deneme");
  console.log(await request.json(), "deneme");
  const { product } = (await request.json()) as any;
  const result = await redis.set("1", JSON.stringify(product));

  return NextResponse.json({ result });
}
