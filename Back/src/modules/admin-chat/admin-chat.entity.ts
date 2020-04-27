import { Schema, Document } from 'mongoose';

export const AdminChatSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export interface IAdminCHat extends Document{
    _id: string;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}