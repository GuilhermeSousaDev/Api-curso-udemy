import { ICreateUsers } from '@modules/users/domain/models/ICreateUsers';
import { IUsers } from '@modules/users/domain/models/IUsers';
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm'
import User from "../entitites/User";

export class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async find(): Promise<IUsers[]> {
        return this.ormRepository.find();
    }

    public async create({ name, email, password }: ICreateUsers): Promise<IUsers> {
        const user = this.ormRepository.create({ name, email, password });

        return user;
    }

    public async save(user: IUsers): Promise<IUsers> {
        return this.ormRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } })

        return user;
    }

    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { name }})

        return user;
    }

    public async findById(id: number): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { id }})

        return user;
    }
}


