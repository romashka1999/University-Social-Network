import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Translation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    variable: string;


    @Column({
        type: 'text',
        nullable: false
    })
    KA: string;

    @Column({
        type: 'text',
        nullable: false
    })
    EN: string;

    @Column({
        type: 'text',
        nullable: false
    })
    RU: string;
}