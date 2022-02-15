import Order from "@modules/orders/infra/typeorm/entities/Orders";

export interface ICustomer {
    id: number;
    name: string;
    email: string;
    order: Order[];
    createdAt: Date;
    updatedAt: Date;
}
