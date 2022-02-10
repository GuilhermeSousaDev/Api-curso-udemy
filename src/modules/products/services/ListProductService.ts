import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/Products.repository';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListProductService {
    constructor(
        @inject('redisCache')
        private redisCache: RedisCache
    ) {}

    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        let products = await this.redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST'
        );

        if(!products) {
            products = await productsRepository.find();
        }

        await this.redisCache.save('api-vendas-PRODUCT_LIST', products);

        return products;
    }
}
