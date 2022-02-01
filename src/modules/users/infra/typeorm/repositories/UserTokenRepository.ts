import { IUserTokenRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, Repository } from 'typeorm'
import UserToken from '../entitites/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository
    extends Repository<UserToken>
    implements IUserTokenRepository {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({ where: { token } })

        return userToken;
    }

    public async generate(user_id: number, token: string): Promise<UserToken> {

        const userToken = this.create({ user_id, token })

        await this.save(userToken)

        return userToken;
    }

}


