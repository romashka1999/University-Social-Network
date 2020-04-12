import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    sendDate: {
        type: Date,
        default: new Date()
    }
});