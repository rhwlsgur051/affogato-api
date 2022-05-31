import { User } from "../../user/entity/User.entity";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "Message" })
@ObjectType()
export class Message extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    messageSeq!: number;

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

    @ManyToOne(() => User, user => user.boards, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'userSeq', referencedColumnName: 'userSeq' })
    user!: User;

    /**
     * 생성자
     * 
     * @param content 내용
     * @param isDeleted 삭제여부
     */
    constructor(
        content: string,
        isDeleted: boolean,
    ) {
        super();
        this.content = content;
        this.isDeleted = isDeleted;
    }
}