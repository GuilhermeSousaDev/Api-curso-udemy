import crypto from 'crypto';
import { EntityRepository, Repository } from 'typeorm'
import UserToken from '../entitites/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({ where: { token } })

        return userToken;
    }

    public async generate(user_id: number): Promise<UserToken> {

        const token = crypto.randomBytes(10).toString('hex')

        const userToken = this.create({ token ,user_id })

        await this.save(userToken)

        return userToken;
    }

}


