import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { IUsers } from '../../../domain/models/IUsers';

@Entity('users')
export default class User implements IUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('varchar')
    avatar: string;

    @CreateDateColumn({ default: Date.now() })
    createdAt: Date;

    @UpdateDateColumn({ default: Date.now() })
    updatedAt: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if(!this.avatar) {
            return null;
        }

        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}
