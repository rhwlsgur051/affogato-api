import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  followSeq!: number;

  @JoinColumn({ name: "from_user_seq" })
  @ManyToOne(() => User, (user) => user.fromUser)
  fromUser!: User;

  @JoinColumn({ name: "to_user_seq" })
  @ManyToOne(() => User, (user) => user.toUser)
  toUser!: User;

  constructor(fromUser: User, toUser: User) {
    super();
    this.fromUser = fromUser;
    this.toUser = toUser;
  }
}
