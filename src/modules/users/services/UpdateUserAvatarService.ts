import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs'
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entitites/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
    user_id: number;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findById(user_id)

        if(!user) {
            throw new AppError('User not found')
        }

        if(uploadConfig.driver === 's3') {
            const s3Provider = new S3StorageProvider();
            
            if(user.avatar) {
                await s3Provider.deleteFile(user.avatar);
            }

            const filename = await s3Provider.saveFile(avatarFilename);
            user.avatar = filename;
        }else {
            const diskProvider = new DiskStorageProvider();

            if(user.avatar) {
                await diskProvider.deleteFile(user.avatar);
            }

            const filename = await diskProvider.saveFile(avatarFilename);
            user.avatar = filename;
        }


        await userRepository.save(user)

        return user;
    }
}

