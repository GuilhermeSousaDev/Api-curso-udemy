import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import MailConfig from '@config/mail/mail';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParserMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParserMailTemplate;
}

export default class SESMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {

        const transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
            })
        })

        const { email, name } = MailConfig.defaults.from;

        const mailTemplate = new HandlebarsMailTemplate();

        await transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        })
    }
}
