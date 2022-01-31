import OrdersProducts from '../../../../orders/infra/typeorm/entities/OrdersProducts';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn}
from 'typeorm'
import { IProducts } from '@modules/products/domain/models/IProducts';

@Entity('products')
export default class Product implements IProducts {
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

    @CreateDateColumn({ default: Date.now() })
    createdAt: Date;

    @UpdateDateColumn({ default: Date.now() })
    updatedAt: Date;
}
