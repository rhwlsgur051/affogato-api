import { CreateRequest } from "../../graphql/board/api/BoardRequest";
import { Board } from "../../graphql/board/entity/Board.entity";
import { Service } from "typedi";

@Service()
export class BoardChangeService {
    // 게시글 생성
    async create(body: CreateRequest) {
        await Board.insert(body);
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
