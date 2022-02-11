import { container } from 'tsyringe';
import { IRedisCache } from './models/IRedisCache';
import RedisCache from '@shared/cache/RedisCache';

container.registerSingleton<IRedisCache>(
    'redisCache',
    RedisCache,
);
