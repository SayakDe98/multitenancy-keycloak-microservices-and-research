import { UserRoles } from "src/utils/userRoles";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleEntity } from "./role.entity";
import { UserRoleEntity } from "./user_role.entity";

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'IAM_ID', type: 'uuid', unique: true })
  public iamId: string;

  @Column({ name: 'USERNAME', length: 500, unique: true })
  public username: string;

  @Column({ name: 'FIRST_NAME', length: 500 })
  public firstName: string;

  @Column({ name: 'LAST_NAME', length: 500 })
  public lastName: string;

  @Column({ name: 'MOBILE_NO', length: 500 })
  public mobileNo: string;

  @Column({ name: 'EMAIL', length: 500, unique: true })
  public email: string;

  @Column({ name: 'ADDRESS', length: 500 })
  public address: string;

  // @Column({ name: 'ROLES', type: 'enum', enum: UserRoles })
  // public roles: UserRoles[];

  @OneToMany(() => UserRoleEntity, userRole => userRole.userDetails, { cascade: true })
  public roles: RoleEntity[];

  @CreateDateColumn({ name: 'CREATED_AT' })
  public createdAt: Date;

  @CreateDateColumn({ name: 'UPDATED_AT' })
  public updatedAt: Date;
}
