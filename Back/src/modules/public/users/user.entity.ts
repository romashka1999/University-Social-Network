import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

import { validatePassword } from '../../shared/auth/helpers/password';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    username: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}