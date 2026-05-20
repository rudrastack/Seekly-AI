import { generateResponse, generatChatTitle } from "../services/ai.service.js";
import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'


export async function sendMessage(req, res) {

    const { message, chat: chatId } = req.body;

    let chat = null;

    const titile = await generatChatTitle(message);


    if (!chatId) {
        chat = await chatModel.create({
            user: req.user.id,
            title: titile
        });
    }

    const activeChatId = chatId || chat._id;

    const userMessage = await messageModel.create({
        chat: activeChatId,
        role: 'user',
        content: message
    });

    const messages = await messageModel.find({ chat: activeChatId });

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: activeChatId,
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

export async function getChats(req, res) {

    const user = req.user

    const chats = await chatModel.find({ user: user.id });

    return res.status(200).json({
        message: 'Chats fetched successfully',
        success: true,
        chats
    });
}

export async function getMessages(req, res) {
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: 'Chat not found',
            success: false,
            err: "Chat not found"
        });
    }

    const messages = await messageModel.find({ chat: chatId });


    return res.status(200).json({
        message: 'Messages fetched successfully',
        success: true,
        messages
    });
}

export async function deleteChat(req, res) {
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    });

    if (!chat) {
        return res.status(404).json({
            message: 'Chat not found',
            success: false,
            err: "Chat not found"
        });
    }

    return res.status(200).json({
        message: 'Chat deleted successfully',
        success: true,
        chat
    });


}