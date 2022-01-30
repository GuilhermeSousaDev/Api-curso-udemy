import { getCustomRepository } from 'typeorm'
import UserRepository from '../infra/typeorm/repositories/UserRepository'
import User from '../infra/typeorm/entitites/User'
import RedisCache from '@shared/cache/RedisCache'

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UserRepository)

        const redisCache = new RedisCache();

        let users = await redisCache.recover<User[]>('api-vendas-USERS_LIST');

        if(!users) {
            users = await userRepository.find();
        }

        await redisCache.save('api-vendas-USERS_LIST', users);

        return users;
    }
}
