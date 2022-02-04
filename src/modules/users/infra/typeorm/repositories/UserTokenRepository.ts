import { ICreateUserToken } from '@modules/users/domain/models/ICreateUserToken';
import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm'
import UserToken from '../entitites/UserToken';

export class UserTokenRepository implements IUserTokenRepository {
    private ormRepository: Repository<UserToken>;
    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async create({
        token,
        user_id
    }: ICreateUserToken): Promise<IUserToken>{
        const userToken = this.ormRepository.create({ token, user_id });

        return userToken
    }

    public async remove(userToken: IUserToken): Promise<IUserToken> {
        return this.ormRepository.remove(userToken);
    }

    public async save(userToken: IUserToken): Promise<UserToken> {
        return this.ormRepository.save(userToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({ where: { token } })

        return userToken;
    }

    public async generate(user_id: number, token: string): Promise<UserToken> {

        const userToken = this.ormRepository.create({ user_id, token })

        await this.ormRepository.save(userToken)

        return userToken;
    }

}


