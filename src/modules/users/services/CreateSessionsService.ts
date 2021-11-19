import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '../typeorm/entitites/User'
import UserRepository from '../typeorm/repositories/UserRepository'

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findByEmail(email)

        if(!user) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const passwordConfirmed = await compare(password, user.email)

        if(!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        return user;
    }
}


