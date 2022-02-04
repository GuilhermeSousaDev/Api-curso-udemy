import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { compare, hash } from 'bcryptjs';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUsers } from '../domain/models/IUsers';

interface IRequest {
    user_id: number;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<IUsers> {
        const user = await this.userRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not Found.')
        }

        const userUpdateEmail = await this.userRepository.findByEmail(email);

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

        await this.userRepository.save(user);

        return user;
    }
}
