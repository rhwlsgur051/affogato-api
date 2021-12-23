import { PasswordTransformer } from "../../../common/transformers/PasswordTransformer";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, getRepository, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationCount, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "UserFriends" })
@ObjectType()
export class UserFriend extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    friendSeq!: number;


    // @Field(() => String)
    // @Column()
    // state!: string;

    // @Column('timestampz')
    // @CreateDateColumn()
    // createdAt?: string;

    // @Column('timestampz')
    // @UpdateDateColumn()
    // updatedAt?: string;

}