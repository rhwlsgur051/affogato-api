import { PasswordTransformer } from "../../../common/transformers/PasswordTransformer";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, getRepository, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationCount, UpdateDateColumn } from "typeorm";

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

    @ManyToMany(() => User, user => user.friends, {
        onDelete: 'CASCADE',
        cascade: ['insert', 'update'], eager: false
    })
    @JoinTable({
        name: 'UserFriends',
        joinColumn: {
            name: 'userSeq1',
            referencedColumnName: 'userSeq'

        },
        inverseJoinColumn: {
            name: 'userSeq2'
        }
    })
    friends!: User[];

    /** API */
    static findAll = () =>
        getRepository(User)
            .find();
}