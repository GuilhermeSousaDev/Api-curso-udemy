import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import User from '../infra/typeorm/entitites/User';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    user_id: number;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class UpdateProfileService {
    public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not Found.')
        }

        const userUpdateEmail = await userRepository.findByEmail(email)

        if(userUpdateEmail && userUpdateEmail.id != user_id) {
            throw new AppError('There is already one user with this email')
        }

        if(password && !old_password) {
            throw new AppError('Old Password is Required')
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new AppError('Old Password does not match.')
            }

            user.password = await hash(password, 8)
        }

        user.name = name
        user.email = email


        const redisCache = new RedisCache();

        redisCache.invalidate('api-vendas-USERS_LIST');

        await userRepository.save(user);

        return user;
    }
}
