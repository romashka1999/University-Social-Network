import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity()
export class AdminPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
        nullable: false,
        default: 'users/create'
    })
    url: string;
}