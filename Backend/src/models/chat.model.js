import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
);

const chatModel = mongoose.model('ChatDB', ChatSchema);
export default chatModel;