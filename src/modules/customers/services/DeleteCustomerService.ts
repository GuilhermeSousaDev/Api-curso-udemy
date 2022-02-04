import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
    id: string;
}

@injectable()
export default class DeleteProductService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomersRepository
        ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const customer = await this.customerRepository.findById(id)

        if(!customer) {
           throw new AppError('Customer not found')
        }

        await this.customerRepository.remove(customer);
    }
}
