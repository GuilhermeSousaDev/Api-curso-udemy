import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
}

@injectable()
export default class ShowCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomersRepository
    ) {}

    public async execute({ id }: IRequest): Promise<ICustomer> {
        const customer = await this.customerRepository.findById(id);

        if(!customer) {
            throw new AppError('Customer not Found.')
        }

        return customer;
    }
}
