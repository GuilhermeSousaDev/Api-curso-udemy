import { ICreateProduct } from "../models/ICreateProduct";
import { IProducts } from "../models/IProducts";

interface IFindProducts {
    id: string;
}

export interface IProductsRepository {
    findByName(name: string): Promise<IProducts | undefined>
    findAllByIds(products: IFindProducts[]): Promise<IProducts[]>;
    //create(data: ICreateProduct): Promise<IProducts>;
    //save(customer: IProducts): Promise<IProducts>;
}
