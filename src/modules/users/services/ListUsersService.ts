import { getCustomRepository } from 'typeorm'
import UserRepository from '../typeorm/repositories/UserRepository'
import User from '../typeorm/entitites/User'

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UserRepository)

        const users = await userRepository.find()

        return users;
    }
}
