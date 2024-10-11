import "server-only"
import { REDIS_URL } from '@/config';
import Redis from 'ioredis';

const redis = new Redis(REDIS_URL);


redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redis;
