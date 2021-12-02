import db from '../../models';
import { Service } from 'typedi';

@Service()
export class ChatChangeService {
    async create(body: { content: string }) {
        return await db.Chat.create(body);
    }
}
