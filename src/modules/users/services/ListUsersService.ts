import { inject, injectable } from 'tsyringe';
import { IUsers } from '@modules/users/domain/models/IUsers';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import RedisCache from '@shared/cache/RedisCache'

@injectable()
export default class ListUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute(): Promise<IUsers[]> {
        const redisCache = new RedisCache();

        let users = await redisCache.recover<IUsers[]>('api-vendas-USERS_LIST');

        if(!users) {
            users = await this.userRepository.find();
        }

        await redisCache.save('api-vendas-USERS_LIST', users);

        return users;
    }
}
