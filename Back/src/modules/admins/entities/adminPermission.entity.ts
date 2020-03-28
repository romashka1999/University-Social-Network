import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    name: string;
}