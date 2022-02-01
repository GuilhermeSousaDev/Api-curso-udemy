import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

@EntityRepository(Customer)
export class CustomerRepository
    extends Repository<Customer>
    implements ICustomersRepository {
        public async findByEmail(email: string): Promise<Customer | undefined> {
            const customer = await this.findOne({ where: { email } })

            return customer;
        }

        public async findByName(name: string): Promise<Customer | undefined> {
            const user = await this.findOne({ where: { name }})

            return user;
        }

        public async findById(id: string): Promise<Customer | undefined> {
            const user = await this.findOne({ where: { id }})

            return user;
        }
}
