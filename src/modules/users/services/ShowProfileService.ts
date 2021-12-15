import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entitites/User';

interface IRequest {
    user_id: number;
}

export default class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not Found.')
        }

        return user;
    }
}
