import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

@Entity('users')
export default class User {
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if(!this.avatar) {
            return null;
        }

        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}
