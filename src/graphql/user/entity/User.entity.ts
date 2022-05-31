import { PasswordTransformer } from "../../../common/transform/PasswordTransformer";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, getRepository, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Follow } from "./Follow.entity";
import { Board } from "../../board/entity/Board.entity";

@Entity({ name: "User" })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  userSeq!: number;

  @Field(() => String)
  @Column()
  id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  email!: string;

  @Field(() => String)
  @Column({ transformer: new PasswordTransformer() })
  password!: string;

  @Column('timestampz')
  @CreateDateColumn()
  createdAt?: string;

  @Column('timestampz')
  @UpdateDateColumn()
  updatedAt?: string;

  @OneToMany(
    () => Follow,
    follow => follow.fromUser, { cascade: true }
  )
  fromUser!: Follow[];

  @OneToMany(
    () => Follow,
    follow => follow.toUser, { cascade: true }
  )
  toUser!: Follow[];

  @OneToMany(() => Board, board => board.user, { cascade: true })
  boards!: Board[];

  /** API */
  static findAll = () =>
    getRepository(User)
      .find();
}