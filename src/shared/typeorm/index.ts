import { createConnection } from 'typeorm';
import User from '@modules/users/typeorm/entitites/User';
import Product from '@modules/products/typeorm/entities/Product';
import UserToken from '@modules/users/typeorm/entitites/UserToken';
import Customer from '@modules/customers/typeorm/entities/Customer';
import Orders from '../../modules/orders/typeorm/entities/Orders';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "api_vendas_teste",
    entities: [User, Product, UserToken, Customer, Orders, OrdersProducts],
    migrations: ["src/shared/typeorm/migrations/*.ts"],
    cli: {
        migrationsDir: "src/shared/typeorm/migrations"
    }
 })
    .then(() => console.log("Conectado com Sucesso"))
    .catch(e => console.log(e))
