import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUsers } from '../domain/models/IUsers';

interface IRequest {
    user_id: number;
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ user_id }: IRequest): Promise<IUsers> {
        const user = await this.userRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not Found.')
        }

        return user;
    }
}
