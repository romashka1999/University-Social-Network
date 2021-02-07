import { Schema, Document } from 'mongoose';

export const ChatSchema = new Schema({
    users: {
        type: Array,
        required: true,
    },
},{
    timestamps: true
});

export interface IChat extends Document{
    _id: string;
    users: any[];
    createdAt: Date;
    updatedAt: Date;
}