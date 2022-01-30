import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository)

        const emailExists = await customerRepository.findByEmail(email)

        if(emailExists) {
            throw new AppError('This email address already used')
        }

        const customer = customerRepository.create({ name, email })

        await customerRepository.save(customer)

        return customer;
    }
}

