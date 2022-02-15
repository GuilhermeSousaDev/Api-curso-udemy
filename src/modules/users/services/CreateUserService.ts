import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache'
import { IUserRepository } from '../domain/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { IUsers } from '../domain/models/IUsers'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('bcryptHashProvider')
        private bcryptHashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<IUsers> {
        const emailExists = await this.userRepository.findByEmail(email);

        if(emailExists) {
            throw new AppError('This email address already used')
        }

        const users = await this.userRepository.create({ name, email, password })

        const hashedPassword = await this.bcryptHashProvider.generateHash(password);

        users.password = hashedPassword

        const redisCache = new RedisCache();

        redisCache.invalidate('api-vendas-USERS_LIST');

        await this.userRepository.save(users)

        return users;
    }
}

