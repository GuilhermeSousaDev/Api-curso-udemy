import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate'
import cors from 'cors';
import '@shared/typeorm';

import router from './routes/index';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.routes()
        this.middlewares()
        this.listen()
    }

    private routes() {
        this.app.use(express.json())
        this.app.use(express.urlencoded())
        this.app.use(router)
        this.app.use(errors())
        this.app.use('/files', express.static(uploadConfig.directory))
    }

    private middlewares() {
        this.app.use(cors())

        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if(error instanceof  AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message
                })
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error: error.message
            })
        })
    }

    private listen() {
        this.app.listen(8081, () => console.log('Iniciado com Sucesso'))
    }
}

new App()
