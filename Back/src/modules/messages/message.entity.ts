import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
    fromUserId: {
        type: Number,
        required: true,
    },
    toUserId: {
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