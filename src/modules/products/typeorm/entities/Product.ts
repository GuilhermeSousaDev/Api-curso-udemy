import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn}
from 'typeorm'

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => OrdersProducts, orderProducts => orderProducts.product)
    order_products: OrdersProducts[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
