import Redis from "ioredis";

const redis = new Redis({
  port: 14533,
  host: "redis-14533.c250.eu-central-1-1.ec2.cloud.redislabs.com",
  password: "CdJkITrZCcwBrzrtdZrDNW8NM7V65hHo",
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Redis error", error);
});

// close redis connection on app close
process.on("SIGINT", () => {
  console.log("Closing redis connection");
  redis.disconnect();
});

export default redis;
