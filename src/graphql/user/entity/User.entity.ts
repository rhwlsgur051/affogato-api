import { PasswordTransformer } from "../../../common/transformers/PasswordTransformer";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, getRepository, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationCount, UpdateDateColumn } from "typeorm";
import { Follow } from "./Follow.entity";

@Entity({ name: "Users" })
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    userSeq!: number;

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
        follow => follow.following
      )
      following!: Follow[];
    
      @OneToMany(
        () => Follow,
        follow => follow.follower
      )
      followers!: Follow[];

    /** API */
    static findAll = () =>
        getRepository(User)
            .find();
}