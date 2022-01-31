import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IProducts {
    id: number;
    order_products: OrdersProducts[];
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
