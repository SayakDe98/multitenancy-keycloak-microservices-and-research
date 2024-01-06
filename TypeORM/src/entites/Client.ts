import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Banker } from "./Banker";
import { Transactions } from "./Transaction";
import { Person } from "./utils/Person";


@Entity('client')
export class Client extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number,
        hair_color: string
    };

    @Column({
        type: "numeric"
    }
    )
    balance: number

    @Column({
        type: "simple-array",
        nullable: true,
    })
    family_members: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(
        () => Transactions,
        transaction => transaction.client
    )
    transactions: Transactions

    @ManyToMany(
        () => Banker
    )
    bankers: Banker[]
}