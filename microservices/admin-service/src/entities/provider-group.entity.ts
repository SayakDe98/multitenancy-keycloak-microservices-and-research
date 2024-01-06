import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('PROVIDER_GROUP')
export class ProviderGroupEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ name: 'CLINIC_ID', type: 'uuid' })
    clinicId: string;

    @Column({ name: 'NAME',  length: 500 })
    name: string;

    @Column({ name: 'DESCRIPTION', length: 500 })
    description: string;

    @Column({ name: 'ROOT_URL', length: 500 })
    rootUrl: string;

    @Column({ name: 'BASE_URL', length: 500 })
    baseUrl: string;

    @Column({ name: 'ALWAYS_DISPLAY_IN_CONSOLE', type: 'boolean' })
    alwaysDisplayInConsole: boolean;

    @CreateDateColumn({ name: 'CREATED_AT' })
    createdAt: Date;

    @CreateDateColumn({ name: 'UPDATED_AT' })
    updatedAt: Date;
}
