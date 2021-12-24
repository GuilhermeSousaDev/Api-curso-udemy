import crypto from 'crypto';
import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository)
        const userTokenRepository = getCustomRepository(UserTokenRepository)

        const user = await userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const user_id = user.id;

        const token = crypto.randomBytes(10).toString('hex');

        const userToken = await userTokenRepository.generate(user_id, token);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${userToken.token}`
                }
            }
        })
    }
}
