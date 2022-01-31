import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

export interface IOrders {
    id: number;
    customer: Customer;
    order_products: OrdersProducts[];
    createdAt: Date;
    updatedAt: Date;
}
