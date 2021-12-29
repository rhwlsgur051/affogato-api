import { ForbiddenError } from "apollo-server-express";

export class MessageError {
    /** 메세지를 찾을 수 없습니다. */
    public readonly MSG001 = new ForbiddenError('메세지를 찾을 수 없습니다.');
}