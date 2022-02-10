import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/Products.repository'
import Product from '../infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: number | string;
    name: string;
    price: number;
    quantity: number
}

@injectable()
class UpdateProductService {
    constructor(
        @inject('redisCache')
        private redisCache: RedisCache
    ) {}

    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id);

        if(!product) {
            throw new AppError('Product not Found');
        }

        const productExists = await productRepository.findByName(name);

        if(productExists && name != product.name) {
            throw new AppError('There already one product with this name');
        }

        this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

        product.name = name
        product.price = price
        product.quantity = quantity

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
