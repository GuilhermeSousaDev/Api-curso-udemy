import { ICreateOrder } from "../models/ICreateOrder";
import { IOrders } from "../models/IOrders";

export interface IOrdersRepository {
    findById(id: string): Promise<IOrders | undefined>;
    createOrder({ customer, products }: ICreateOrder): Promise<IOrders>;
    //create(data: ICreateOrder): Promise<IOrders>;
    //save(customer: IOrders): Promise<IOrders>;
}
