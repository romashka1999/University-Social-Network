import { BaseEntity, Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AdminRole } from "./adminRole.entity";
import { validatePassword } from "src/modules/auth/helpers/password";

export enum AdminStatus {
    BLOCKED = "BLOCKED",
    ACTIVE = "ACTIVE"
}

@Entity()
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    @Column({
        type: 'enum', 
        enum: AdminStatus,
        default: AdminStatus.ACTIVE
    })
    status: AdminStatus;

    @ManyToOne(type => AdminRole, adminRole => adminRole.admins, {eager: true})
    adminRole: AdminRole;

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}