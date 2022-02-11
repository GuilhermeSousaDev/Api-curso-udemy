import { getCustomRepository } from 'typeorm'
import ProductRepository from '../infra/typeorm/repositories/Products.repository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe';
import { IRedisCache } from '@shared/container/providers/CacheProvider/models/IRedisCache';

interface IRequest {
    id: string;
}

@injectable()
export default class DeleteProductService {
    constructor(
        @inject('redisCache')
        private redisCache: IRedisCache,
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
