import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import User from '../infra/typeorm/entitites/User';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string
}

@injectable()
export default class CreateSessionsService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('This user not exist', 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if(!passwordConfirmed) {
            throw new AppError('Incorrect password combination', 401)
        }

        const { id } = user
        const token = sign({ id }, auth.jwt.secret , { expiresIn: auth.jwt.expiresIn})

        return { user, token };
    }
}


