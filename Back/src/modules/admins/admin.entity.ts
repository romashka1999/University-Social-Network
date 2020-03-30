import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

import { validatePassword } from '../auth/helpers/password';

export enum AdminStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

@Entity()
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: true
    })
    profileImgUrl: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'enum',
        enum: AdminStatus,
        default: AdminStatus.ACTIVE,
        nullable: false
    })
    status: AdminStatus;

    @Column({
        type: 'text',
        nullable: false
    })
    password: string;

    @Column({
        type: 'text',
        nullable: false
    })
    salt: string;

    public async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}