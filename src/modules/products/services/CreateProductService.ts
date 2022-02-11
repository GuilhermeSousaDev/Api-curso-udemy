import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/Products.repository';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IRedisCache } from '@shared/container/providers/CacheProvider/models/IRedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}


@injectable()
class CreateProductService {
    constructor(
        @inject('redisCache')
        private redisCache: IRedisCache,
    ) {}

    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const productExists = await productsRepository.findByName(name);

        if(productExists) {
            throw new AppError('There is alredy one product with this name');
        }

        const product = productsRepository.create({ name, price, quantity });

        await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
