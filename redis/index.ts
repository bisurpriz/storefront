import Redis from "ioredis";

const redis = new Redis({
  port: 14533,
  host: "redis-14533.c250.eu-central-1-1.ec2.cloud.redislabs.com",
  password: "CdJkITrZCcwBrzrtdZrDNW8NM7V65hHo",
  connectionName: "redis",
  retryStrategy: (times) => Math.min(times * 50, 2000),
  connectTimeout: 10000,
  lazyConnect: true,
  name: "redis",
  disconnectTimeout: 10000,
  maxLoadingRetryTime: 10000,
  enableReadyCheck: true,
  showFriendlyErrorStack: true,
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Redis error", error);
});

redis.on("end", () => {
  console.log("Redis connection closed");
});

export default redis;
