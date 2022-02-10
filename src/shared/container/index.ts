import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

import { UserRepository }  from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';

import { UserTokenRepository }  from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

import RedisCache from '@shared/cache/RedisCache';

container.registerSingleton<ICustomersRepository>(
    'CustomerRepository',
    CustomerRepository
);

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);

container.registerSingleton<IUserTokenRepository>(
    'userTokenRepository',
    UserTokenRepository,
);

container.registerSingleton<RedisCache>(
    'redisCache',
    RedisCache,
);
