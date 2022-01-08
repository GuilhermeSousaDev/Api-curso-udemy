import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/Products.repository'
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: number | string;
    name: string;
    price: number;
    quantity: number
}

class UpdateProductService {

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

        const redisCache = new RedisCache();

        redisCache.invalidate('api-vendas-PRODUCT_LIST');

        product.name = name
        product.price = price
        product.quantity = quantity

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
