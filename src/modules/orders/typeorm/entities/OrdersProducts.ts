import Product from '../../../products/typeorm/entities/Product';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import Order from './Orders';

@Entity('orders_products')
export default class OrdersProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Order, order => order.order_products)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(type => Product, product => product.order_products)
    @JoinColumn({ name: 'Product_id' })
    product: Product;

    @Column()
    order_id: string;

    @Column()
    product_id: number;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
