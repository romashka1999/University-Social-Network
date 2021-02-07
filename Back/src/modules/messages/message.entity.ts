import { Schema, Document } from 'mongoose';

export const MessageSchema = new Schema({
    chatId: {
        type: String,
        required: true
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
    imageUrl: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export interface IMessage extends Document{
    _id: string;
    chatId: string;
    userId: number;
    content: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}