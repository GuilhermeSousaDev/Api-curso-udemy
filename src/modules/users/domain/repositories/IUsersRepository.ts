import { ICreateUsers } from "../models/ICreateUsers";
import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository {
    findByToken(token: string): Promise<IUserToken | undefined>;
    generate(user_id: number, token: string): Promise<IUserToken>;
    //create(data: ICreateUsers): Promise<IUsers>;
    //save(customer: IUsers): Promise<ICreateUsers>;
}
