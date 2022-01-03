import { User } from "../../user/entity/User.entity";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Column("text")
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
   * @param title 제목
   * @param content 내용
   * @param isDeleted 삭제여부
   * @param user 사용자
   */
    constructor(
        title: string,
        content: string,
        isDeleted: boolean,
    ) {
        super();
        this.title = title;
        this.content = content;
        this.isDeleted = isDeleted;
    }
}