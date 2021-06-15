import db from "../models";

export const createChat = async ({ body }: { body: any }) => {
    return await db.Chat.create(body);;
}
