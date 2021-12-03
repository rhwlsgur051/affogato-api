import { Service } from "typedi";
import db from "../../models";
import * as BoardType from '../../graphql/board/board.type'

@Service()
export class BoardChangeService {
    // 게시글 생성
    async create(body: BoardType.CreateRequest) {
        await db.Board.create(body);
        return true;
    }
}
