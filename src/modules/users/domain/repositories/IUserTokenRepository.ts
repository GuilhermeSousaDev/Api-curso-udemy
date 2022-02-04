import { ICreateUserToken } from "../models/ICreateUserToken";
import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository {
    findByToken(token: string): Promise<IUserToken | undefined>;
    generate(user_id: number, token: string): Promise<IUserToken>;
    remove(userToken: IUserToken): Promise<IUserToken>;
    create(data: ICreateUserToken): Promise<IUserToken>;
    save(user: IUserToken): Promise<IUserToken>;
}
