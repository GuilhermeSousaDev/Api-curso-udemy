import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm'
import Order from '../../../../orders/infra/typeorm/entities/Orders';
import { ICustomer } from '../../../domain/models/ICustomer';

@Entity('customers')
export default class Customer implements ICustomer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @OneToMany(type => Order, order => order.customer)
    order: Order[];

    @CreateDateColumn({ default: Date.now() })
    createdAt: Date;

    @UpdateDateColumn({ default: Date.now() })
    updatedAt: Date;
}
