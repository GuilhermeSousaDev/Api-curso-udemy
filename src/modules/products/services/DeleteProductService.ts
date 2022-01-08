import { getCustomRepository } from 'typeorm'
import ProductRepository from '../typeorm/repositories/Products.repository'
import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
}

export default class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository)

        const product = await productsRepository.findOne(id);

        if(!product) {
            throw new AppError('Product not found');
        }

        const redisCache = new RedisCache();

        redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.remove(product);
    }
}
