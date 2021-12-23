import { PasswordTransformer } from "../../../common/transformers/PasswordTransformer";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, getRepository, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToMany(type => User)
    @JoinTable()
    friends?: User[];

    /** API */
    static findAll = () =>
        getRepository(User)
            .find();
}