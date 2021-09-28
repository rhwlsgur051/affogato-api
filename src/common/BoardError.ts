import { ForbiddenError } from "apollo-server-express";

export class BoardError {
    public readonly Board001 = new ForbiddenError('게시글을 찾을 수 없습니다.');
}