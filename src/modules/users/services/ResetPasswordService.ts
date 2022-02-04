import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,

        @inject('userTokenRepository')
        private userTokenRepository: IUserTokenRepository
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User Token does not exists');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            await this.userTokenRepository.remove(userToken);

            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8);

        await this.userRepository.save(user);
    }
}

