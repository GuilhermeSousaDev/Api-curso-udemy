import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export class FakeCustomersRepository implements ICustomersRepository {
        private customers: Customer[] = [];

        public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
            const customer = new Customer();

            customer.id = 1;
            customer.name = name;
            customer.email = email;

            this.customers.push(customer);

            return customer;
        }

        public async save(customer: ICustomer): Promise<ICustomer> {
            Object.assign(this.customers, customer);

            return customer;
        }

        find(): Promise<ICustomer[]> {
            return undefined;
        }

        remove(customer: ICustomer): Promise<void> {
            return undefined;
        }

        public async findByEmail(email: string): Promise<ICustomer | undefined> {
            const customer = this.customers.find(customer => customer.email === email);

            return customer;
        }

        public async findByName(name: string): Promise<ICustomer | undefined> {
            const customer = this.customers.find(customer => customer.name === name);

            return customer;
        }

        public async findById(id: string): Promise<ICustomer | undefined> {
            const customer = this.customers.find(customer => {
                String(customer.id) === id;
            });

            return customer;
        }
}
