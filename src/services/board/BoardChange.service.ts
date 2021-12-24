import { CreateRequest } from "../../graphql/board/api/BoardRequest";
import { Board } from "../../graphql/board/entity/Board.entity";
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal } from "typeorm";

@Service()
export class BoardChangeService {
    // 게시글 생성
    async create(body: CreateRequest) {
        const userSeq = body.userSeq;
        try {
            if (userSeq) {
                const rUser = await User.findOne({ userSeq: Equal(userSeq) }, { relations: ['boards'] });
                const cBoard = new Board(body.title, body.content, false);
                rUser?.boards.push(cBoard);
                rUser?.save();
            }
        } catch (error) {
            console.error(error);
        }

        return true;
    }

    // 게시글 삭제
    async delete(boardSeq: number) {
        await Board.update({
            boardSeq
        }, {
            isDeleted: true
        });

        return true;
    }
}
