import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entitites/User'
import UserRepository from '../infra/typeorm/repositories/UserRepository'
import { hash } from 'bcryptjs'
import RedisCache from '@shared/cache/RedisCache'

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)

        const emailExists = await userRepository.findByEmail(email)

        if(emailExists) {
            throw new AppError('This email address already used')
        }


        const users = userRepository.create({ name, email, password })

        const hashedPassword = await hash(password, 8)

        users.password = hashedPassword

        const redisCache = new RedisCache();

        redisCache.invalidate('api-vendas-USERS_LIST');

        await userRepository.save(users)

        return users;
    }
}

