import { BaseEntity, Entity, Column, ManyToOne } from "typeorm";

import { AdminRole } from "./adminRole.entity";
import { validatePassword } from "src/shared/password";

@Entity()
export class Admin extends BaseEntity {

    @Column({type: 'text', unique: true})
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    @ManyToOne(type => AdminRole, adminRole => adminRole.admins, {eager: true})
    adminRole: AdminRole;

    async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}