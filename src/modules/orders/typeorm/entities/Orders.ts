import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import Customer from '@modules/customers/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';

@Entity('order')
export default class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer => customer.order)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(type => OrdersProducts, ordersProducts => ordersProducts.order, {
        cascade: true
    })
    order_products: OrdersProducts[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
