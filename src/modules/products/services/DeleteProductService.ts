import { getCustomRepository } from 'typeorm'
import ProductRepository from '../infra/typeorm/repositories/Products.repository'
import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
}

@injectable()
export default class DeleteProductService {
    constructor(
        @inject('redisCache')
        private redisCache: RedisCache
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository)

        const product = await productsRepository.findOne(id);

        if(!product) {
            throw new AppError('Product not found');
        }

        this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.remove(product);
    }
}
