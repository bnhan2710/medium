import { createClient } from 'redis';
import env from '../../utils/env';
export class RedisService {
    private redisClient;

    constructor() {
        this.redisClient = createClient({ url: env.REDIS_URI });

        this.redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.redisClient.connect()
            .then(() => console.log('Redis connected successfully!'))
            .catch((err) => console.error('Redis connection failed:', err));
    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async getRange(key: string, start: number, stop: number): Promise<string[]> {
        const posts = await this.redisClient.zRange(key, start, stop, { REV: true });
        return posts;
    }
}
