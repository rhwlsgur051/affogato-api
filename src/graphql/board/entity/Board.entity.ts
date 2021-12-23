import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "Boards" })
@ObjectType()
export class Board extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    boardSeq!: number;

    @Field(() => String)
    @Column()
    title!: string;

    @Field(() => String)
    @Column()
    content!: string;

    @Field(() => Boolean)
    @Column({ default: false })
    isDeleted!: boolean

    @Column('timestampz')
    @CreateDateColumn()
    createdAt?: string;

    @Column('timestampz')
    @UpdateDateColumn()
    updatedAt?: string;

}