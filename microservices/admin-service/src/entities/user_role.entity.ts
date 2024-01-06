import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'USER_ROLE' })
export class UserRoleEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'ROLE_UUID', length: 500 })
  public roleUuid: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'USER_ID', referencedColumnName: 'id' })
  public userDetails: UserEntity;
}
