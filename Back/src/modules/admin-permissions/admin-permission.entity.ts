import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}


@Entity()
@Unique(['url', 'requestMethod'])
export class AdminPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    url: string;

    @Column({
        type: 'enum',
        enum: RequestMethod,
        nullable: false
    })
    requestMethod: RequestMethod; 
}