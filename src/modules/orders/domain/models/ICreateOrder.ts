import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IProducts } from '@modules/products/domain/models/IProducts';

export interface ICreateOrder  {
    customer: ICustomer;
    products: IProducts[];
}
