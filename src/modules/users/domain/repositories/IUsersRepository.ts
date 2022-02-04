import { ICreateUsers } from "../models/ICreateUsers";
import { IUsers } from "../models/IUsers";

export interface IUserRepository {
    find(): Promise<IUsers[]>;
    findByEmail(email: string): Promise<IUsers | undefined>;
    findByName(name: string): Promise<IUsers | undefined>;
    findById(id: number): Promise<IUsers | undefined>
    create(data: ICreateUsers): Promise<IUsers>;
    save(customer: IUsers): Promise<IUsers>;
}
