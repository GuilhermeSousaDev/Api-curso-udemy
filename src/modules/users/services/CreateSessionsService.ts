import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '../typeorm/entitites/User'
import UserRepository from '../typeorm/repositories/UserRepository'

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findByEmail(email)

        if(!user) {
            throw new AppError('This user not exist', 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if(!passwordConfirmed) {
            throw new AppError('Incorrect password combination', 401)
        }

        return user;
    }
}


