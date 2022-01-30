import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import auth from '@config/auth'

interface TokenPayload {
    iat: number;
    exp: number;
    id: number;
}


export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction): void {
    const token = req.headers.authorization

    if(!token) {
        throw new AppError('JWT token is missing')
    }

    try {
        const decodedToken = verify(token, auth.jwt.secret);

        const { id } = decodedToken as TokenPayload;

        req.user = { id: id }

        return next();
    } catch (e) {
        throw new AppError('Invalid JWT Token');
    }
}
