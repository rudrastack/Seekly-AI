import { generateResponse, generatChatTitle } from "../services/ai.service.js";
import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'


export async function sendMessage(req, res) {

    const { message, chat: chatId } = req.body;

    const titile = await generatChatTitle(message);

    let title = null, chat = null;

    if (!chat) {
        const chat = await chatModel.create({
            user: req.user.id,
            title: titile
        });

    }


    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        role: 'user',
        content: message
    });

    const messages = await messageModel.find({ chat: chatId });
   
    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        role: 'ai',
        content: result
    });

    return res.status(200).json({
        message: 'Message sent successfully',
        success: true,
        chat,
        aiMessage,
        titile,
        userMessage
    });
}

