import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}


@Entity()
export class AdminPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    url: string;

    @Column({
        type: 'enum',
        enum: Method,
        default: Method.GET,
        nullable: false
    })
    method: Method; 
}