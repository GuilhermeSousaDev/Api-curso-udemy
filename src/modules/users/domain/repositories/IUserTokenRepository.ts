import { ICreateUsers } from "../models/ICreateUsers";
import { IUsers } from "../models/IUsers";

export interface IUsersRepository {
    findByEmail(email: string): Promise<IUsers | undefined>;
    findByName(name: string): Promise<IUsers | undefined>;
    findById(id: number): Promise<IUsers | undefined>
    //create(data: ICreateUsers): Promise<IUsers>;
    //save(customer: IUsers): Promise<ICreateUsers>;
}
