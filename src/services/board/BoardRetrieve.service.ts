import { Board } from '../../graphql/board/entity/Board.entity';
import { User } from '../../graphql/user/entity/User.entity';
import * as _ from 'lodash';
import { Service } from "typedi";
import { Equal } from 'typeorm';

import { BoardError } from '../../common/error/BoardError';
import { UserError } from '../../common/error/UserError';

@Service()
export class BoardRetrieveService {
    // 게시판 목록 조회
    async find() {
        const rUsers: User[] = await User.find();
        const rBoards: any = await Board.find({
            isDeleted: Equal(false)
        });

        _.forEach(rBoards, rBoard => {
            const boardUser = _.find(rUsers, rUser => rUser.userSeq === rBoard.userSeq);
            if (boardUser) {
                rBoard.userName = boardUser.name;
            }
        });

        return rBoards;
    }

    // 게시판 단건 조회
    async findOne(boardSeq: any) {
        //     const board = await Board.findOne({
        //         where: {
        //             boardSeq,
        //             isDeleted: false
        //         }
        //     });

        //     const rUser = await User.findOne({ userSeq: Equal(board.userSeq) });

        //     if (!rUser) {
        //         throw new UserError().USER001;
        //     }
        //     if (!board) {
        //         throw new BoardError().Board001;
        //     }

        //     board.userName = rUser.name;
        //     return board;
        // }
    }
}
