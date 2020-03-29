import { BaseEntity, Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

import { AdminPermission } from "./adminPermission.entity";
import { Admin } from "./admin.entity";



@Entity()
export class AdminRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    role: string;

    @ManyToMany(type => AdminPermission, adminPermission => adminPermission.id, {eager: true})
    permissions: AdminPermission[];

    @OneToMany(type => Admin, admin => admin.adminRole, {eager: true})
    admins: any;
}