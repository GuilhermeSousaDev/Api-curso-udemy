import Customer from "../entities/Customer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { Repository, getRepository } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

export class CustomerRepository implements ICustomersRepository {
        private ormRepository: Repository<ICustomer>;

        constructor() {
            this.ormRepository = getRepository(Customer);
        }

        public async find(): Promise<ICustomer[]> {
            const customers = await this.ormRepository.find();

            return customers;
        }

        public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
            const customer = this.ormRepository.create({ name, email });

            await this.ormRepository.save(customer);

            return customer;
        }

        public async save(customer: ICustomer): Promise<ICustomer> {
            await this.ormRepository.save(customer);

            return customer;
        }

        public async remove(customer: ICustomer): Promise<void> {
            await this.ormRepository.remove(customer);
        }

        public async findByEmail(email: string): Promise<ICustomer | undefined> {
            const customer = await this.ormRepository.findOne({
                where: {
                    email,
                }
            })

            return customer;
        }

        public async findByName(name: string): Promise<ICustomer | undefined> {
            const user = await this.ormRepository.findOne({
                where: {
                    name,
                }
            })

            return user;
        }

        public async findById(id: string): Promise<ICustomer | undefined> {
            const user = await this.ormRepository.findOne({
                where: {
                    id,
                }
            })

            return user;
        }
}
