import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'ROLE' })
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'UUID', type: 'uuid', unique: true })
  public uuid: string;

  @Column({ name: 'NAME', length: 500 })
  public name: string;

  @Column({ name: 'DESCRIPTION', length: 500 })
  public description: string;

}