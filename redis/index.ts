export const redisOptions = {
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
};
