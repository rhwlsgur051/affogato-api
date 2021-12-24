import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  followSeq!: number;

  @ManyToOne(
    () => User,
    user => user.following
  )
  following!: User;

  @ManyToOne(
    () => User,
    user => user.followers
  )
  follower!: User;

  @Column({ type: Boolean, default: false })
  checked!: Boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}