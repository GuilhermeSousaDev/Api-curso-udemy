import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import '@shared/typeorm';

import router from './routes/index';
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
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(router)
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
                message: 'Internal server error'
            })
        })
    }

    private listen() {
        this.app.listen(8081, () => console.log('Iniciado com Sucesso'))
    }
}

new App()
