import { Router } from "express";
import { sendMessage, getChats, getMessages, deleteChat } from "../controllers/chat.contoller.js";
import { authUser } from "../middleware/auth.middleware.js";


const chatRouter = Router();

chatRouter.post('/message', authUser, sendMessage);
chatRouter.get('/', authUser, getChats);
chatRouter.get('/:chatId/message', authUser, getMessages);
chatRouter.delete('/delete/:chatId', authUser, deleteChat);

export default chatRouter

