import { container } from 'tsyringe';
import BcryptHashProvider from './implementations/BcryptHashProvider';

container.registerSingleton(
    'bcryptHashProvider',
    BcryptHashProvider,
);
