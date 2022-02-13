import { ICreateUsers } from '@modules/users/domain/models/ICreateUsers';
import { IUsers } from '@modules/users/domain/models/IUsers';
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entitites/User';

export class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async find(): Promise<IUsers[]> {
        return undefined;
    }

    public async create({ name, email, password }: ICreateUsers): Promise<IUsers> {
        const user = new User();

        user.id = Math.floor(Math.random() * 10);
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: IUsers): Promise<IUsers> {
        Object.assign(this.users, user);

        return user;
    }

    public async findByEmail(email: string): Promise<IUsers | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async findByName(name: string): Promise<IUsers | undefined> {
        const user = this.users.find(user => user.name === name);

        return user;
    }

    public async findById(id: number): Promise<IUsers | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    }
}


