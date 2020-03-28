import { BaseEntity, Entity, Column } from "typeorm";

@Entity()
export class AdminPermission extends BaseEntity {

    @Column({type: 'text', unique: true})
    name: string


}