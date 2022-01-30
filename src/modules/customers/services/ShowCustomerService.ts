import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    id: string;
}

export default class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository)

        const customer = await customerRepository.findById(id);

        if(!customer) {
            throw new AppError('Customer not Found.')
        }

        return customer;
    }
}
