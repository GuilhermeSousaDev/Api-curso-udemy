import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import User from '../typeorm/entitites/User'
import UserRepository from '../typeorm/repositories/UserRepository'
import { hash } from 'bcryptjs'

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
        const hashedPassword = await hash(password, 8)

        const users = userRepository.create({ name, email, password })

        users.password = hashedPassword

        await userRepository.save(users)

        return users;
    }
}

