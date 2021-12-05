import crypto from 'crypto';
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UserToken from '../typeorm/entitites/UserToken'
import UserRepository from '../typeorm/repositories/UserRepository'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<UserToken> {
        const userRepository = getCustomRepository(UserRepository)
        const userTokenRepository = getCustomRepository(UserTokenRepository)

        const user = await userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const user_id = user.id;

        const token = crypto.randomBytes(10).toString('hex');

        const userToken = await userTokenRepository.generate(user_id, token);

        return userToken;
    }
}

