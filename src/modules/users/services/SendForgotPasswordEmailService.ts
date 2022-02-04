import crypto from 'crypto';
import path from 'path';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import mailConfig from '@config/mail/mail'
import { inject, injectable } from 'tsyringe';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('userTokenRepository')
        private userTokenRepository: IUserTokenRepository,

        @inject('userRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const user_id = user.id;

        const token = crypto.randomBytes(10).toString('hex');

        const userToken = await this.userTokenRepository.generate(user_id, token);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );

        if (mailConfig.driver === 'ses') {
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
                        link: `${process.env.APP_WEB_URL}/reset_password?token=${userToken.token}`
                    }
                }
            });
            return;
        }

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
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${userToken.token}`
                }
            }
        })
    }
}

