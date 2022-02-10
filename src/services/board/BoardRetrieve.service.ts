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
        const rBoards: any = await Board.find({
            where: {
                isDeleted: false
            }, order: {
                boardSeq: -1
            },
            relations: ["user"]
        });

        return rBoards;
    }

    // 게시판 단건 조회
    async findOne(boardSeq: any) {
        const rBoard = await Board.findOne({
            where: {
                boardSeq,
                isDeleted: false
            }, relations: ['user']
        });

        return rBoard;
    }
}
