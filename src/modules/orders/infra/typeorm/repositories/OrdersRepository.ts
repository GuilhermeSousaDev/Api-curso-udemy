import { EntityRepository, Repository } from 'typeorm';
import { IOrdersRepository } from '../../../domain/repositories/IOrdersRepository';
import Order from '../entities/Orders';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  customer: Customer;
  products: Product[];
}

@EntityRepository(Order)
class OrdersRepository
    extends Repository<Order>
    implements IOrdersRepository {
    public async findById(id: string): Promise<Order | undefined> {
        const order = this.findOne(id, {
        relations: ['order_products', 'customer'],
        });

        return order;
    }

    public async createOrder({ customer, products }: IRequest): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products
        });

        await this.save(order);

        return order;
    }
}

export default OrdersRepository;
