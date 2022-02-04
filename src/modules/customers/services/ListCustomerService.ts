import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class ListCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomersRepository
    ) {}

    public async execute(): Promise<ICustomer[]> {
        const customers = await this.customerRepository.find();

        return customers;
    }
}
