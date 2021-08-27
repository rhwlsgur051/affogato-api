import db from "../../models";
import { Service } from 'typedi';

@Service()
export class ChatRetrieveService {
    async find() {
        return await db.Chat.find();
    }
}
