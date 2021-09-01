// import { BoardError } from "../../common/UserError";
import * as _ from 'lodash';
import { Service } from "typedi";
import db from "../../models";

@Service()
export class BoardRetrieveService {
    // 게시판 목록 조회
    async find() {
        const rUsers = await db.User.findAll();
        const rBoards = await db.Board.findAll();

        _.forEach(rBoards, rBoard => {
            const boardUser = _.find(rUsers, rUser => rUser.id === rBoard.userSeq);
            if (boardUser) {
                rBoard.userName = boardUser.name;
            }
        });

        return rBoards;
    }

    // 게시판 단건 조회
    async findOne(id: number) {
        const board = await db.Board.findOne({
            where: {
                id
            }
        });

        if (!board) {
            // throw new UserError().USER001;
        }

        return board;
    }
}
