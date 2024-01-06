import { Entity, BaseEntity, Column } from "typeorm";


@Entity()
export class Person extends BaseEntity{
    @Column()
    first_name: string;

    @Column({
        default: ''
    })
    middle_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true,
        length: 10
    })
    card_number: string;

}