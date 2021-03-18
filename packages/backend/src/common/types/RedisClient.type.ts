import { Redis, Cluster } from 'ioredis';

export type RedisClient = Cluster | Redis;
