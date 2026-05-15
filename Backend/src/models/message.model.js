import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'ai'],
            default: 'user'
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model('MessageDB', MessageSchema);
export default messageModel;
