import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Admin } from "../admins/admin.entity";
import { AdminPermission } from "../admin-permissions/admin-permission.entity";


@Entity()
export class AdminRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
        nullable: false,
        default: 'SUPER_ADMIN'
    })
    role: string;


    @ManyToMany(type => AdminPermission)
    @JoinTable()
    permissions: AdminPermission[];

    
    @OneToMany(type => Admin, admin => admin.adminRole)
    admins: Admin[];
}